import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Admin from '../views/Admin.vue'
import Basket from '../views/Basket.vue'
import AddNewItems from '../components/admin/AddNewItems'
import Login from '../components/admin/Login'
import Favourite from '../views/Favourite.vue'
import ProductDetails from '../views/ProductDetails.vue'
import Orders from '../views/Orders.vue'

import firebase from "firebase";
import "firebase/firestore";


Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'Product',
    component: Product
  },
  {
    path: '/productDetails',
    name: 'ProductDetails',
    component: ProductDetails
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/addNew',
    name: 'addNew',
    component: AddNewItems,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/fav',
    name: 'Favourite',
    component: Favourite,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/basket',
    name: 'Basket',
    component: Basket
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
const currentUser = firebase.auth().currentUser;
const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

if (requiresAuth && !currentUser) next('login');
else next();
});

export default router
