<script setup lang="ts">
import PageContainer from '@/components/shared/PageContainer.vue'
</script>

<template>
  <PageContainer>
    <div class="flex flex-col items-center justify-center h-full">
      <h1 class="text-2xl font-bold">
        Not Found
      </h1>
      <p class="text-sm text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <RouterLink to="/">
        Go to Home
      </RouterLink>
    </div>
  </PageContainer>
</template>
