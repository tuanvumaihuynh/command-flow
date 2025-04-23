<script setup lang="ts">
import Logo from './Logo.vue'
import MainNav from './MainNav.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
</script>

<template>
  <div class="flex-col hidden md:flex">
    <div class="border-b">
      <div class="container flex items-center h-16 px-4">
        <Logo />
        <MainNav class="mx-6" />
        <div class="flex items-center ml-auto space-x-4">
          <ThemeSwitcher />
        </div>
      </div>
    </div>
    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>
