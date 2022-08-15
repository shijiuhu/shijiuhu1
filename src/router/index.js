import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/fruits/apple'
  },
  {
    path: '/login',
    component: () => import('../components/Login.vue'),
    meta: {
      title: '登录',
      keepAlive: false
    }
  },
  {
    path: '/home',
    component: () => import('../components/Home.vue')
  },
  {
    path: '/questionNaire',
    component: () => import('../components/QuestionNaire.vue'),
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
        component: () => import('../components/Apple.vue'),
        meta: {
          title: '苹果',
          keepAlive: false
        }
      },
      {
        path: 'orange',
        component: () => import('../components/Orange.vue'),
        meta: {
          title: '橘子',
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/test',
    component: () => import('../components/Test.vue')
  }
]

const router = new createRouter({
  routes,
  history: createWebHistory()
})

export default router