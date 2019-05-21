import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import MulteType from "@/components/MulteType/MulteType";
import NewMulta from "@/components/NewMulta/NewMulta";
import NewMultaType from "@/components/NewMultaType/NewMultaType";
import NewPlayer from "@/components/NewPlayer/NewPlayer";
import Players from "@/components/Players/Players";
import Player from "@/components/Player/Player";
import Home from "@/components/Home/Home";
import Setting from "@/components/Setting/Setting";
import Registration from "@/components/Registration/Registration";

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/players',
      name: 'Players',
      component: Players,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/player',
      name: 'Player',
      component: Player,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/newPlayer',
      name: 'NewPlayer',
      component: NewPlayer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/newMulta',
      name: 'NewMulta',
      component: NewMulta,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/multeType',
      name: 'MulteType',
      component: MulteType,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/newMultaType',
      name: 'NewMultaType',
      component: NewMultaType,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (sessionStorage.getItem('token') != undefined || sessionStorage.getItem('token') != null) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
