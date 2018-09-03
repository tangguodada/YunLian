import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({ //静态路由，登录、404
  mode:'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['../components/login.vue'], resolve)
    },
    {
      path: '/404',
      name: 'err',
      component: (resolve) => require(['../components/err.vue'], resolve)
    },
  ]
});
export default router //默认静态路由

export const dynamicRouter =[ //动态路由
  {
    path: '/',
    name: 'home',
    meta: {  //添加meta标签，里面自定义了roles，用来设置权限
      roles:['ROLE_ADMIN','ROLE_MANAGER'], //该路由仅admin和user权限访问
    },
    component: (resolve) => require(['../components/home.vue'], resolve),
    children:[
      {
        path:'tangkou',
        name:'tangkou',
        meta:{
          roles:['ROLE_ADMIN'],
          menu: '塘口管理'
        },
        component: (resolve) => require(['../components/tangkou'], resolve)
      },
      {
        path:'product',
        name:'product',
        meta:{
          roles:['ROLE_ADMIN'],
          menu: '产品管理'
        },
        component: (resolve) => require(['../components/product'], resolve)
      },
      {
        path:'medicine',
        name:'medicine',
        meta:{
          roles:['ROLE_ADMIN']
        },
        component: (resolve) => require(['../components/medicine'], resolve)
      },
      {
        path:'personnelManagement',
        name:'personnelManagement',
        meta:{
          roles:['ROLE_ADMIN'],
          menu: '人员管理'
        },
        component: (resolve) => require(['../components/PersonnelManagement'], resolve)
      },
      {
        path:'shuizhi',
        name:'shuizhi',
        meta:{
          roles:['ROLE_ADMIN']
        },
        component: (resolve) => require(['../components/shuizhi'], resolve)
      },
      {
        path:'touwei',
        name:'touwei',
        meta:{
          roles:['ROLE_ADMIN']
        },
        component: (resolve) => require(['../components/touwei'], resolve)
      },
      {
        path:'zhongmiao',
        name:'zhongmiao',
        meta:{
          roles:['ROLE_ADMIN']
        },
        component: (resolve) => require(['../components/zhongmiao'], resolve)
      },
      {
        path:'showProduct/:id',
        name:'showProduct',
        meta:{
          roles:['ROLE_ADMIN','ROLE_EMPLOYEE'],
        },
        component: (resolve) => require(['../components/showProduct'], resolve)
      },
      {
        path:'showPersonalProduct/:username',
        name:'showPersonalProduct',
        meta:{
          roles:['ROLE_ADMIN','ROLE_EMPLOYEE','ROLE_EMPLOYEE'],
        },
        component: (resolve) => require(['../components/showPersonalProduct'], resolve)
      },
    ]
  },
  {
    path: '/',
    name: 'home',
    meta: {  //添加meta标签，里面自定义了roles，用来设置权限
      roles:['ROLE_EMPLOYEE'], //该路由仅admin和user权限访问
    },
    component: (resolve) => require(['../components/home.vue'], resolve),
    children:[
      {
        path:'tangkou',
        name:'tangkou',
        meta:{
          roles:['ROLE_ADMIN','ROLE_EMPLOYEE'],
          menu: '我的塘口'
        },
        component: (resolve) => require(['../components/tangkou'], resolve)
      },
      {
        path:'product',
        name:'product',
        meta:{
          roles:['ROLE_EMPLOYEE'],
          menu: '产品管理'
        },
        component: (resolve) => require(['../components/product'], resolve)
      },
      {
        path:'medicine',
        name:'medicine',
        meta:{
          roles:['ROLE_EMPLOYEE'],
          menu: '药品管理'
        },
        component: (resolve) => require(['../components/medicine'], resolve)
      },
      {
        path:'shuizhi',
        name:'shuizhi',
        meta:{
          roles:['ROLE_EMPLOYEE'],
          menu: '水质管理'
        },
        component: (resolve) => require(['../components/shuizhi'], resolve)
      },
      {
        path:'touwei',
        name:'touwei',
        meta:{
          roles:['ROLE_EMPLOYEE'],
          menu: '日常投喂'
        },
        component: (resolve) => require(['../components/touwei'], resolve)
      },
      {
        path:'zhongmiao',
        name:'zhongmiao',
        meta:{
          roles:['ROLE_EMPLOYEE'],
          menu: '种苗管理'
        },
        component: (resolve) => require(['../components/zhongmiao'], resolve)
      },
      {
        path:'showProduct/:id',
        name:'showProduct',
        meta:{
          roles:['ROLE_ADMIN','ROLE_EMPLOYEE'],
        },
        component: (resolve) => require(['../components/showProduct'], resolve)
      },
      {
        path:'showPersonalProduct/:username',
        name:'showPersonalProduct',
        meta:{
          roles:['ROLE_ADMIN','ROLE_EMPLOYEE','ROLE_EMPLOYEE'],
        },
        component: (resolve) => require(['../components/showPersonalProduct'], resolve)
      }
    ]
  },
  {
    path:'/personal',
    name:'personal',
    component: (resolve) => require(['../components/Personal'], resolve),
    meta:{
      roles:['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_EMPLOYEE'],
    },
  },
];

