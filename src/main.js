import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

const app = new Vue({
  router,
}).$mount('#app')
