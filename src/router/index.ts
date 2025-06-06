import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const MainLayout = () => import('@/components/layouts/main-layout/MainLayout.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: {
          title: 'Dashboard',
        },
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
        path: 'commands',
        name: 'commands',
        component: () => import('@/views/CommandConfig.vue'),
        meta: {
          title: 'Commands',
        },
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/Setting.vue'),
        meta: {
          title: 'Setting',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
