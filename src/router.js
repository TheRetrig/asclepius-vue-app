import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import AppHeader from './layout/AppHeader.vue'
import Display from './views/Display.vue'
import NewRecord from './views/NewRecord.vue'
import Login from './views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      header: AppHeader,
      default: Home
    },
  },
  {
    path: '/login',
    name: 'Login',
    components: {
      default: Login
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  },
  {
    path: '/content/:id',
    name: 'Display',
    components: {default: Display, header: AppHeader}
  },
  {
    path: '/new',
    name: 'New',
    components: {default: NewRecord, header: AppHeader}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
