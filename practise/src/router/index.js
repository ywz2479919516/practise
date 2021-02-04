import Vue from 'vue'
import Router from 'vue-router'
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
      path: '/p1',
      name: 'p1',
      component: practise1
    },
    {
      path: '/p2',
      component: practise2
    }
  ]
})
