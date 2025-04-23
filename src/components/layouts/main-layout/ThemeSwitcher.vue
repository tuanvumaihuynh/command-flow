<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useColorMode } from '@vueuse/core'
import { Moon, Sun } from 'lucide-vue-next'

const { store } = useColorMode()

function toggleColorMode() {
  store.value = store.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <Button variant="ghost" size="icon" @click="toggleColorMode">
    <Sun v-if="store === 'light'" class="h-4 w-4" />
    <Moon v-else class="h-4 w-4" />
    <span class="sr-only">Toggle color mode</span>
  </Button>
</template>
