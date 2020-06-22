import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Firebase from 'firebase'
import Create from './components/Create'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/create',
      name: 'create',
      component: () => import("./components/Create.vue"),
      meta: {
        requireLogin: true  // El meta tiene relación con la función guardia (se representa con una respuesta booleana)
      }
    },
    {
      path: '/home',
      name:'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      // NOT FOUND 404
      path: "*",
      component: () => import("./views/NotFound.vue")
      }
  ]
})

/* Guard que pide autenticación para entrar a lugares que no son públicos. Si no se está logeado, no tiene acceso a
los sitios con privilegios de administrador o usuario */

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  let user = Firebase.auth().currentUser;
  let authRequired = to.matched.some(route => route.meta.requireLogin)
  if(!user && authRequired){
    next('home')
  } else {
    next()
  }
})

export default router;