import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ClientDashboard from '../views/ClientDashboard.vue'
import JudgeDashboard from '../views/JudgeDashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/register', component: Register, name: 'Register' },
  { path: '/client', component: ClientDashboard, name: 'ClientDashboard', meta: { role: 'client' } },
  { path: '/judge', component: JudgeDashboard, name: 'JudgeDashboard', meta: { role: 'judge' } },
  { path: '/admin', component: AdminDashboard, name: 'AdminDashboard', meta: { role: 'admin' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  
  if (to.meta.role && user.role !== to.meta.role) {
    next('/login')
  } else {
    next()
  }
})

export default router
