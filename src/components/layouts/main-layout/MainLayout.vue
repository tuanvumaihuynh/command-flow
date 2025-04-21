<script setup lang="ts">
import ColorSwitcher from './ColorSwitcher.vue'
import Logo from './Logo.vue'
import MainNav from './MainNav.vue'
</script>

<template>
  <div class="flex-col hidden md:flex">
    <div class="border-b">
      <div class="container flex items-center h-16 px-4">
        <Logo />
        <MainNav class="mx-6" />
        <div class="flex items-center ml-auto space-x-4">
          <ColorSwitcher />
        </div>
      </div>
    </div>
    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>
