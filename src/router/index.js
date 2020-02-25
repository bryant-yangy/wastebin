import Vue from 'vue'
import Router from 'vue-router'

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const productList = r => require.ensure([], () => r(require('@/page/productList')), 'productList');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');

const deliverlist = r => require.ensure([], () => r(require('@/page/deliverlist')), 'deliverlist');
const orderlist = r => require.ensure([], () => r(require('@/page/orderlist')), 'orderlist');
const addproduct = r => require.ensure([], () => r(require('@/page/addproduct')), 'addproduct');
const userlist = r => require.ensure([], () => r(require('@/page/userlist')), 'userlist');
const wastelist = r => require.ensure([], () => r(require('@/page/wastelist')), 'wastelist');

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/manage',
    name: '',
    component: manage,
    children: [{
      path: '',
      component: home,
      meta: []
    },
    {
      path: '/productList',
      component: productList,
      meta: ['商品信息管理','商品列表']
    },
    {
      path: '/deliverlist',
      component: deliverlist,
      meta: ['垃圾信息管理','投递信息列表']
    },
    {
      path: '/orderlist',
      component: orderlist,
      meta: ['用户信息管理','订单列表']
    },
    {
      path: '/addproduct',
      component: addproduct,
      meta: ['商品信息管理','新增商品']
    },
    {
      path: '/userlist',
      component: userlist,
      meta: ['用户信息管理','用户列表']
    },
    {
      path: '/wastelist',
      component: wastelist,
      meta: ['垃圾信息管理','可识别垃圾列表']
    }]
	}
]

var router=new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})

export default router
import myStore from '@/components/store';	

