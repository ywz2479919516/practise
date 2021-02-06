import Vue from 'vue'
import Router from 'vue-router'
import App1 from '../App1'
import App2 from '../App2'
import App3 from '../App3'
import select from '../select'
import practise1 from '../components/practise1'
import practise2 from '../components/practise2'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'select',
      component: select
    },
    {
      path: '/app1',
      name: 'App1',
      component: App1
    },
    {
      path: '/app2',
      name: 'App2',
      component: App2
    },
    {
      path: '/app3',
      name: 'App3',
      component: App3
    },
    {
      path: '/p1',
      name: 'p1',
      component: practise1
    },
    {
      path: '/p2',
      name: 'p2',
      component: practise2
    }
  ]
})
