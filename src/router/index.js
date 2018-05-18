import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/main-page/Main-page'
const Fivedays = () => import('@/components/fivedays/Fivedays')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/fivedays',
      name: 'Fivedays',
      component: Fivedays

    }
  ]
})
