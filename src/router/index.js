import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制面板' }
    }]
  },
  {
    path: '/strategy',
    component: Layout,
    meta: { title: '策略中心', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/strategy/index'),
        meta: { title: '简单策略', icon: 'table' }
      },
      {
        path: 'indicator',
        name: 'Indicator',
        component: () => import('@/views/strategy/indicator'),
        meta: { title: '指标策略', icon: 'tree' }
      }, {
        path: 'list',
        name: 'List',
        component: () => import('@/views/strategy/list'),
        meta: { title: '我的策略', icon: 'excel' }
      }
    ]
  },
  {
    path: '/robot',
    component: Layout,
    meta: { title: '托管中心', icon: 'people' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/robot/list'),
        meta: { title: '我的机器人', icon: 'peoples' }
      }, {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/robot/index'),
        meta: { title: '添加机器人', icon: 'people' }
      }, {
        path: 'info',
        name: 'Info',
        hidden: true,
        component: () => import('@/views/robot/info'),
        meta: { title: '运行监控', icon: 'table' }
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    meta: {
      title: '配置中心',
      icon: 'nested'
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/account/index'),
        meta: { title: 'api配置', icon: 'table' }
      }, {
        path: 'email',
        name: 'Email',
        component: () => import('@/views/account/email'),
        meta: { title: '邮件配置', icon: 'email' }
      }, {
        path: 'info',
        name: 'Info',
        hidden: true,
        component: () => import('@/views/account/info'),
        meta: { title: '账户信息', icon: 'table' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    hidden: true,
    meta: {
      title: '订单',
      icon: 'nested'
    },
    children: [
      {
        path: 'list',
        name: 'List',
        hidden: true,
        component: () => import('@/views/order/list'),
        meta: { title: '订单列表', icon: 'table' }
      },
      {
        path: 'profit',
        name: 'Profit',
        hidden: true,
        component: () => import('@/views/order/profit'),
        meta: { title: '盈亏列表', icon: 'table' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
