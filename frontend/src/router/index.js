import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ClientDashboard from '../views/ClientDashboard.vue'
import JudgeDashboard from '../views/JudgeDashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const routes = [
  { path: '/', component: LandingPage, name: 'Home' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/register', component: Register, name: 'Register' },
  { 
    path: '/client', 
    component: ClientDashboard, 
    name: 'ClientDashboard', 
    meta: { requiresAuth: true, role: 'client' } 
  },
  { 
    path: '/judge', 
    component: JudgeDashboard, 
    name: 'JudgeDashboard', 
    meta: { requiresAuth: true, role: 'judge' } 
  },
  { 
    path: '/admin', 
    component: AdminDashboard, 
    name: 'AdminDashboard', 
    meta: { requiresAuth: true, role: 'admin' } 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  const user = JSON.parse(sessionStorage.getItem('user') || '{}')
  const publicRoutes = ['/', '/login', '/register']

  // Not logged in trying to access protected route
  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  // Wrong role trying to access a dashboard
  if (to.meta.role && user.role !== to.meta.role) {
    if (token) {
      // Logged in but wrong role — send to their correct dashboard
      return next(`/${user.role}`)
    }
    return next('/login')
  }

  next()
})

export default router