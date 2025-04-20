<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useRouter } from 'vue-router'

const router = useRouter()

const routes = router.getRoutes()
</script>

<template>
  <nav
    :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')"
  >
    <RouterLink
      v-for="route in routes.filter(route => route.path !== '/')"
      :key="route.path"
      :to="route.path"
      active-class="text-primary"
      class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      {{ route.meta.title }}
    </RouterLink>
  </nav>
</template>
