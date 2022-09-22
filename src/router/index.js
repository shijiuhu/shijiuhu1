import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('../view/Login.vue'),
    meta: {
      title: '登录',
      keepAlive: false
    }
  },
  {
    path: '/home',
    component: () => import('../view/Home.vue')
  },
  {
    path: '/questionNaire',
    component: () => import('../view/QuestionNaire.vue'),
    meta: {
      title: '调查问卷',
      keepAlive: false
    }
  },
  {
    path: '/fruits',
    meta: {
      title: '水果'
    },
    children: [
      {
        path: 'apple',
        component: () => import('../view/i18nExample/Apple.vue'),
        meta: {
          title: '苹果',
          keepAlive: false
        }
      },
      {
        path: 'orange',
        component: () => import('../view/i18nExample/Orange.vue'),
        meta: {
          title: '橘子',
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/testMore',
    component: () => import('../view/TestMore.vue')
  },
  {
    path: '/provinceTree',
    component: () => import('../view/provinceTree/ProvinceTree.vue'),
    meta: {
      title: '省市树',
      keepAlive: true
    }
  },
  {
    path: '/random',
    component: () => import('../view/Random.vue'),
    meta: {
      title: '随机数',
      keepAlive: false
    }
  },
  {
    path: '/calendar',
    component: () => import('../view/calendar/Calendar.vue'),
    meta: {
      title: '日历时间',
      keepAlive: false
    }
  }
]

const router = new createRouter({
  routes,
  history: createWebHistory()
})

export default router