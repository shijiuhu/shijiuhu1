import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('view/Login.vue'),
    meta: {
      title: '登录',
      keepAlive: false
    }
  },
  {
    path: '/home',
    component: () => import('view/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/questionNaire',
    component: () => import('view/QuestionNaire.vue'),
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
        component: () => import('view/i18nExample/Apple.vue'),
        meta: {
          title: '苹果',
          keepAlive: false
        }
      },
      {
        path: 'orange',
        component: () => import('view/i18nExample/Orange.vue'),
        meta: {
          title: '橘子',
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/testMore',
    component: () => import('view/TestMore.vue'),
    meta: {
      title: '测试更多'
    }
  },
  {
    path: '/provinceTree',
    component: () => import('view/provinceTree/ProvinceTree.vue'),
    meta: {
      title: '省市树',
      keepAlive: true
    }
  },
  {
    path: '/random',
    component: () => import('view/Random.vue'),
    meta: {
      title: '随机数',
      keepAlive: false
    }
  },
  {
    path: '/calendar',
    component: () => import('view/calendar/Calendar.vue'),
    meta: {
      title: '日历时间',
      keepAlive: false
    },
  },
  {
    path: '/dateComDes',
    component: () => import('view/calendar/DateComDes.vue'),
    meta: {
      title: '日期组件描述'
    }
  },
  {
    path: '/electronicClock',
    component: () => import('view/electronicClock/ElectronicClock.vue'),
    meta: {
      title: '电子钟'
    }
  },
  {
    path: '/electronicClock2',
    component: () => import('view/electronicClock/ElectronicClock2.vue'),
    meta: {
      title: '电子钟2-网上案例'
    }
  },
  {
    path: '/rouletteClock',
    component: () => import('view/clock/RouletteClock.vue'),
    meta: {
      title: '轮盘时钟'
    }
  },
  {
    path: '/mixedClock',
    component: () => import('view/clock/MixedClock.vue'),
    meta: {
      title: '混合时钟'
    }
  },
  {
    path: '/nameplate',
    component: () => import('view/Nameplate.vue'),
    meta: {
      title: '铭牌',
      keepAlive: false
    }
  },
  {
    path: '/markdownEditor',
    component: () => import('view/MarkdownEditor.vue'),
    meta: {
      title: 'Markdown编辑器'
    }
  },
  {
    path: '/getData',
    component: () => import('view/GetData.vue'),
    meta: {
      title: '获取数据'
    }
  },
  {
    path: '/sortGrid',
    component: () => import('view/sortGrid/SortGrid.vue'),
    meta: {
      title: '带有排序和过滤器的网格'
    }
  },
  {
    path: '/treeView',
    component: () => import('view/treeView/TreeView.vue'),
    meta: {
      title: '树状视图'
    }
  },
  {
    path: '/svgImage',
    component: () => import('view/svgImage/SvgImage.vue'),
    meta: {
      title: 'SVG图像'
    }
  },
  {
    path: '/modalBox',
    component: () => import('view/modalBox/ModalBox.vue'),
    meta: {
      title: '带过渡动效的模态框'
    }
  },
  {
    path: '/transitionGroup',
    component: () => import('view/TransitionGroup.vue'),
    meta: {
      title: '带过渡动效的列表'
    }
  },
  {
    path: '/todoMVC',
    component: () => import('view/todoMVC/TodoMVC.vue'),
    meta: {
      title: 'TodoMVC'
    }
  },
  {
    path: '/tempConverter',
    component: () => import('view/TempConverter.vue'),
    meta: {
      title: '温度转换器'
    }
  },
  {
    path: '/timer',
    component: () => import('view/Timer.vue'),
    meta: {
      title: '计时器'
    }
  },
  {
    path: '/svgDemo',
    component: () => import('view/svgDemo/SvgDemo'),
    meta: {
      title: 'SVG的使用示例'
    }
  },
  {
    path: '/teleportTest',
    component: () => import('view/modalBox/TeleportTest'),
    meta: {
      title: 'Teleport功能测试'
    }
  },
  {
    path: '/CURD',
    component: () => import('view/CURD.vue'),
    meta: {
      title: 'CURD'
    }
  },
  {
    path: '/drawCircle',
    component: () => import('view/DrawCircle.vue'),
    meta: {
      title: '画圆'
    }
  }
]

const router = new createRouter({
  routes,
  history: createWebHistory()
})

// 设置每个路由的标题，为防止出现undefined不友好显示，最后或上'shijiuhu1'的项目名称
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title || 'shijiuhu1'
  next()
})

export default router