import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard'),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})


export default router