import Vue from 'vue'
import Router from 'vue-router'
import App1 from '../App1'
import App2 from '../App2'
import App3 from '../App3'
import select from '../select'
import practise1 from '../components/practise1'
import practise2 from '../components/practise2'
import menuPage1 from '../components/menuPage1'
import menuPage2 from '../components/menuPage2'
import menuPage3 from '../components/menuPage3'

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
      components: {
        app: select
      }
    },
    {
      path: '/app1',
      name: 'App1',
      components: {
        app: App1
      },
      children: [
        {
          path: '/p1',
          name: 'p1',
          components: {
            app1: practise1
          }
        },
        {
          path: '/p2',
          name: 'p2',
          components: {
            app1: practise2
          }
        }
      ]
    },
    {
      path: '/app2',
      name: 'App2',
      components: {
        app: App2
      }
    },
    {
      path: '/app3',
      name: 'App3',
      components: {
        app: App3
      },
      children: [
        {
          path: '/m1',
          name: 'm1',
          components: {
            app3: menuPage1
          }
        },
        {
          path: '/m2',
          name: 'm2',
          components: {
            app3: menuPage2
          }
        },
        {
          path: '/m3',
          name: 'm3',
          components: {
            app3: menuPage3
          }
        }
      ]
    }
  ]
})
