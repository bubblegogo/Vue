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
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
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
      component: () => import('@/views/dashboard/index')
    }]
  },
  { path: '/404', redirect: '/404', hidden: true }
]
export const asyncRouterMap = [
  {
    path: '/admin',
    component: Layout,
    meta: { title: 'Manager', icon: 'example', role: [1] },
    children: [
      {
        path: 'menumanager',
        name: 'Menu',
        component: () => import('@/views/admin/sidemenu/index'),
        meta: { title: 'Menu', icon: 'example', role: [11] }
      },
      {
        path: 'usermanager',
        name: 'User',
        component: () => import('@/views/admin/usermanager/index'),
        meta: { title: 'User', icon: 'example', role: [12] }
      },
      {
        /* 这种写法 自动将 参数转换成 组件属性
        path: 'edituser:id',
        props:true,*/
        path: 'edituser',
        name: 'EditUser',
        component: () => import('@/views/admin/usermanager/edituser'),
        props: (route) => ({ id: route.query.id }), // 通过函数把值进行转换成组件属性
        hidden: true
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: 'Article',
    meta: { title: 'Article', icon: 'example', role: [2] },
    children: [
      {
        path: 'list',
        name: 'ArticleList',
        component: () => import('@/views/article/index'),
        meta: { title: 'ArticleList', icon: 'table', role: [21] }
      },
      {
        /* 这种写法 自动将 参数转换成 组件属性
        path: 'edituser:id',
        props:true,*/
        path: 'editArticle',
        name: 'EditArticle',
        component: () => import('@/views/article/editarticle'),
        props: (route) => ({ id: route.query.id }), // 通过函数把值进行转换成组件属性
        hidden: true
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/tree',
    name: 'Example',
    meta: { title: 'Example', icon: 'example', role: [3] },
    children: [
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree', role: [32] }
      }
    ]
  },
  {
    path: '/echart',
    component: Layout,
    redirect: '/echart/mixchart',
    name: 'Chart',
    meta: { title: 'mixChart', icon: 'example', role: [4] },
    children: [
      {
        path: 'mixchart',
        name: 'mixChart',
        component: () => import('@/views/chart/mixchart'),
        meta: { title: 'mixChart', icon: 'example', role: [41] }
      },
      {
        path: 'linechart',
        name: 'lineChart',
        component: () => import('@/views/chart/linechart'),
        meta: { title: 'linechart', icon: 'example', role: [42] }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    meta: { title: 'Form', icon: 'form' },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'example' }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]
export default new Router({
  /* vue-router 默认 hash 模式
     history 模式需要后端支持，如果遇到不支持的时候，需要设置 fallback 为 true，它会自动帮我们转成哈希去处理
    mode: 'history',
    fallback: true,*/

  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

