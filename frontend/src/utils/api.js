// Mock API — no backend needed. All data lives in sessionStorage.

const USERS_KEY = 'cms_users'
const APTS_KEY = 'cms_appointments'
const DELETED_KEY = 'cms_deleted_appointments'

// ── helpers ──────────────────────────────────────────────────────────────────

function getUsers() {
  return JSON.parse(sessionStorage.getItem(USERS_KEY) || '[]')
}
function saveUsers(users) {
  sessionStorage.setItem(USERS_KEY, JSON.stringify(users))
}
function getApts() {
  return JSON.parse(sessionStorage.getItem(APTS_KEY) || '[]')
}
function saveApts(apts) {
  sessionStorage.setItem(APTS_KEY, JSON.stringify(apts))
}
function getDeleted() {
  return JSON.parse(sessionStorage.getItem(DELETED_KEY) || '[]')
}
function saveDeleted(d) {
  sessionStorage.setItem(DELETED_KEY, JSON.stringify(d))
}
function currentUser() {
  return JSON.parse(sessionStorage.getItem('user') || 'null')
}
function ok(data) {
  return Promise.resolve({ data })
}
function fail(msg, status = 400) {
  const err = new Error(msg)
  err.response = { data: { message: msg }, status }
  return Promise.reject(err)
}
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

// ── seed users (always present) ───────────────────────────────────────────────

export function seedUsers() {
  const existing = getUsers()
  const seeds = [
    { id: 'seed-client', name: 'Client User', email: 'client@gmail.com', password: 'client123', role: 'client', phone: '' },
    { id: 'seed-judge',  name: 'Judge User',  email: 'judge@gmail.com',  password: 'judge123',  role: 'judge',  phone: '' },
    { id: 'seed-admin',  name: 'Admin User',  email: 'admin@gmail.com',  password: 'admin123',  role: 'admin',  phone: '' }
  ]
  // keep only non-seed registered users, then add fresh seeds
  const nonSeeds = existing.filter(u => !u.id.startsWith('seed-'))
  saveUsers([...seeds, ...nonSeeds])
}

// ── route handlers ────────────────────────────────────────────────────────────

const routes = {

  // POST /auth/login
  'POST /auth/login': ({ email, password, role }) => {
    const users = getUsers()
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) return fail('Invalid email or password')
    if (role && user.role !== role) return fail(`This account is not a ${role}`)
    const { password: _, ...safeUser } = user
    const token = btoa(JSON.stringify({ id: user.id, role: user.role }))
    return ok({ token, user: safeUser })
  },

  // POST /auth/register  (client self-registration)
  'POST /auth/register': ({ name, email, password, phone, role }) => {
    const users = getUsers()
    if (users.find(u => u.email === email)) return fail('Email already registered')
    const newUser = { id: uid(), name, email, password, phone: phone || '', role: role || 'client' }
    saveUsers([...users, newUser])
    return ok({ message: 'Registration successful' })
  },

  // GET /users/me
  'GET /users/me': () => {
    const u = currentUser()
    if (!u) return fail('Not authenticated', 401)
    return ok(u)
  },

  // PATCH /users/me
  'PATCH /users/me': (payload) => {
    const u = currentUser()
    if (!u) return fail('Not authenticated', 401)
    const users = getUsers()
    const idx = users.findIndex(x => x.id === u.id)
    if (idx === -1) return fail('User not found', 404)
    if (payload.email && payload.email !== u.email) {
      if (users.find(x => x.email === payload.email)) return fail('Email already in use')
    }
    const updated = { ...users[idx], ...payload }
    if (!payload.password) delete updated.password === undefined  // keep existing
    users[idx] = updated
    saveUsers(users)
    const { password: _, ...safeUser } = updated
    localStorage.setItem('user', JSON.stringify(safeUser))
    return ok({ user: safeUser })
  },

  // GET /users  (admin: all users)
  'GET /users': () => {
    return ok(getUsers().map(({ password: _, ...u }) => u))
  },

  // GET /users/judges
  'GET /users/judges': () => {
    return ok(getUsers().filter(u => u.role === 'judge').map(({ password: _, ...u }) => u))
  },

  // POST /users  (admin registers staff)
  'POST /users': ({ name, email, password, phone, role }) => {
    const users = getUsers()
    if (users.find(u => u.email === email)) return fail('Email already registered')
    const newUser = { id: uid(), name, email, password, phone: phone || '', role }
    saveUsers([...users, newUser])
    return ok({ message: `${role} registered successfully` })
  },

  // GET /appointments  (admin: all)
  'GET /appointments': () => {
    return ok(getApts())
  },

  // GET /appointments/my  (client: own)
  'GET /appointments/my': () => {
    const u = currentUser()
    return ok(getApts().filter(a => a.client_id === u?.id))
  },

  // GET /appointments/assigned  (judge: assigned to them)
  'GET /appointments/assigned': () => {
    const u = currentUser()
    return ok(getApts().filter(a => a.judge_id === u?.id && a.status === 'Assigned'))
  },

  // GET /appointments/deleted
  'GET /appointments/deleted': () => {
    return ok(getDeleted())
  },

  // POST /appointments  (book — FormData)
  'POST /appointments': (formData) => {
    const u = currentUser()
    if (!u) return fail('Not authenticated', 401)
    const docs = []
    if (formData instanceof FormData) {
      const files = formData.getAll('documents')
      files.forEach(f => { if (f && f.name) docs.push({ name: f.name, url: '#' }) })
    }
    const apt = {
      id: uid(),
      client_id: u.id,
      client_name: u.name,
      client_email: u.email,
      service: formData instanceof FormData ? formData.get('service') : formData.service,
      date: formData instanceof FormData ? formData.get('date') : formData.date,
      description: formData instanceof FormData ? formData.get('description') : formData.description,
      status: 'Pending',
      documents: docs,
      judge_id: null,
      remarks: ''
    }
    saveApts([...getApts(), apt])
    return ok({ message: 'Appointment booked', appointment: apt })
  },

  // PATCH /appointments/:id/status
  'PATCH /appointments/:id/status': (payload, id) => {
    const apts = getApts()
    const idx = apts.findIndex(a => a.id === id)
    if (idx === -1) return fail('Appointment not found', 404)
    apts[idx] = { ...apts[idx], status: payload.status, remarks: payload.remarks || apts[idx].remarks }
    saveApts(apts)
    return ok({ message: 'Status updated' })
  },

  // PATCH /appointments/:id/reschedule
  'PATCH /appointments/:id/reschedule': (payload, id) => {
    const apts = getApts()
    const idx = apts.findIndex(a => a.id === id)
    if (idx === -1) return fail('Appointment not found', 404)
    apts[idx] = { ...apts[idx], date: payload.date, status: 'Rescheduled', remarks: payload.remarks || apts[idx].remarks }
    saveApts(apts)
    return ok({ message: 'Rescheduled' })
  },

  // PATCH /appointments/:id/assign
  'PATCH /appointments/:id/assign': (payload, id) => {
    const apts = getApts()
    const idx = apts.findIndex(a => a.id === id)
    if (idx === -1) return fail('Appointment not found', 404)
    const judge = getUsers().find(u => u.id === payload.judgeId)
    apts[idx] = { ...apts[idx], judge_id: payload.judgeId, judge_name: judge?.name || '', status: 'Assigned' }
    saveApts(apts)
    return ok({ message: 'Judge assigned' })
  },

  // DELETE /appointments/:id  (client cancel)
  'DELETE /appointments/:id': (payload, id) => {
    const apts = getApts()
    const apt = apts.find(a => a.id === id)
    if (!apt) return fail('Appointment not found', 404)
    const deleted = { ...apt, deleted_at: new Date().toLocaleDateString() }
    saveDeleted([...getDeleted(), deleted])
    saveApts(apts.filter(a => a.id !== id))
    return ok({ message: 'Appointment cancelled' })
  },

  // PATCH /appointments/:id  (client edit)
  'PATCH /appointments/:id': (payload, id) => {
    const apts = getApts()
    const idx = apts.findIndex(a => a.id === id)
    if (idx === -1) return fail('Appointment not found', 404)
    apts[idx] = { ...apts[idx], ...payload }
    saveApts(apts)
    return ok({ message: 'Appointment updated' })
  },

  // PATCH /appointments/:id/remarks  (judge saves remarks)
  'PATCH /appointments/:id/remarks': (payload, id) => {
    const apts = getApts()
    const idx = apts.findIndex(a => a.id === id)
    if (idx === -1) return fail('Appointment not found', 404)
    apts[idx] = { ...apts[idx], remarks: payload.remarks }
    saveApts(apts)
    return ok({ message: 'Remarks saved' })
  },

  // PUT /appointments/:id  (client edit via put)
  'PUT /appointments/:id': (payload, id) => {
    const apts = getApts()
    const idx = apts.findIndex(a => a.id === id)
    if (idx === -1) return fail('Appointment not found', 404)
    apts[idx] = { ...apts[idx], ...payload }
    saveApts(apts)
    return ok({ message: 'Appointment updated' })
  }
}

// ── mock axios-compatible object ──────────────────────────────────────────────

function dispatch(method, url, payload) {
  // fixed sub-routes that must NOT be treated as :id
  const fixed = ['/appointments/my', '/appointments/assigned', '/appointments/deleted']
  const isFixed = fixed.some(f => url.endsWith(f))

  const idMatch = !isFixed && url.match(/\/appointments\/([^/]+)/)
  const id = idMatch ? idMatch[1] : null
  const normUrl = id ? url.replace(id, ':id') : url

  const key = `${method} ${normUrl}`
  const handler = routes[key]
  if (!handler) {
    console.warn('[mock-api] No handler for', key)
    return fail(`No mock handler for ${key}`, 404)
  }
  return handler(payload, id)
}

const api = {
  get:    (url)                => dispatch('GET',    url, {}),
  post:   (url, data)          => dispatch('POST',   url, data),
  patch:  (url, data)          => dispatch('PATCH',  url, data),
  delete: (url)                => dispatch('DELETE', url, {}),
  put:    (url, data)          => dispatch('PUT',    url, data)
}

export default api
