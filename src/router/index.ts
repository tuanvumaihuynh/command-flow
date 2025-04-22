import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const MainLayout = () => import('@/components/layouts/main-layout/MainLayout.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/command-flows',
    children: [
      {
        path: 'command-flows',
        meta: {
          title: 'Command Flows',
        },
        children: [
          {
            path: '',
            name: 'command-flows',
            component: () => import('@/views/CommandFlows.vue'),
          },
          {
            path: ':id',
            name: 'command-flow-builder',
            component: () => import('@/views/CommandFlowBuilder.vue'),
          },
          {
            path: ':id/run',
            name: 'command-flow-run',
            component: () => import('@/views/CommandFlowRun.vue'),
          },
        ],
      },
      {
        path: 'locations',
        name: 'locations',
        component: () => import('@/views/Locations.vue'),
        meta: {
          title: 'Locations',
        },
      },
      {
        path: 'robots',
        name: 'robots',
        component: () => import('@/views/Robots.vue'),
        meta: {
          title: 'Robots',
        },
      },
      {
        path: 'data-management',
        name: 'data-management',
        component: () => import('@/views/DataManagement.vue'),
        meta: {
          title: 'Data Management',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
