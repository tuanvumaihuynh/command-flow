<script setup lang="ts">
import { Command } from 'lucide-vue-next'
</script>

<template>
  <RouterLink class="flex items-center gap-2" to="/">
    <Command class="h-6 w-6" />
    <span class="text-xl font-bold">
      Command Flow
    </span>
  </RouterLink>
</template>
