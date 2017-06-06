import Vue from 'vue'
import VueRouter from 'vue-router'
import filters from './filters'
import components from './components'
import routes from './routes'

for(const name in filters){
  Vue.filter(name, filters[name])
}

for(const name in components){
  Vue.component(name, components[name])
}

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

const app = new Vue({
  router,
}).$mount('#app')
