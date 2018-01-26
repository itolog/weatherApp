import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/main-page/Main-page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    }
  ]
})