<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Route {
  path: string
  title: string
}

const routes: Route[] = [
  { path: '/dashboard', title: 'Dashboard' },
  { path: '/locations', title: 'Locations' },
  { path: '/setting', title: 'Setting' },
]
</script>

<template>
  <nav
    :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')"
  >
    <RouterLink
      v-for="route in routes"
      :key="route.path"
      :to="route.path"
      active-class="text-primary"
      class="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
    >
      {{ route.title }}
    </RouterLink>
  </nav>
</template>
