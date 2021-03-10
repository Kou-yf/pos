import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/pos'
import leftNav from '@/components/common/leftNav'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'pos',
      component: Pos
    }
  ]
})
