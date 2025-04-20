import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const MainLayout = () => import('@/components/layouts/main-layout/MainLayout.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/command-flow',
    children: [
      {
        path: 'command-flow',
        component: () => import('@/views/CommandFlow.vue'),
        meta: {
          title: 'Command Flow',
        },
      },
      {
        path: 'locations',
        component: () => import('@/views/Locations.vue'),
        meta: {
          title: 'Locations',
        },
      },
      {
        path: 'robots',
        component: () => import('@/views/Robots.vue'),
        meta: {
          title: 'Robots',
        },
      },
      {
        path: 'data-management',
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
