import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard.vue';
import Auth from '@/views/Auth.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/auth',
    name: '',
    component: Auth,
  },
  {
    path: '/Servers',
    name: 'Servers',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Servers.vue')
  },
  {
    path: '/Fileshare',
    name: 'Fileshare',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Fileshare.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
