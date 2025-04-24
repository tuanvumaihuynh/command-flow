<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

interface Route {
  path: string
  title: string
}
const isOpen = ref(false)

const routes: Route[] = [
  { path: '/dashboard', title: 'Dashboard' },
  { path: '/locations', title: 'Locations' },
  { path: '/robots', title: 'Robots' },
  { path: '/setting', title: 'Setting' },
]
</script>

<template>
  <nav
    :class="cn('hidden md:flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')"
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

  <!-- Mobile hamburger menu -->
  <Sheet v-model:open="isOpen">
    <SheetTrigger as-child>
      <Button variant="ghost" size="icon" class="md:hidden">
        <Menu class="w-5 h-5" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="pt-8 ">
      <nav class="flex flex-col gap-4">
        <RouterLink
          v-for="route in routes"
          :key="route.path"
          :to="route.path"
          active-class="text-primary"
          class="text-base font-medium text-muted-foreground hover:text-primary"
          @click="isOpen = false"
        >
          {{ route.title }}
        </RouterLink>
      </nav>
    </SheetContent>
  </Sheet>
</template>
