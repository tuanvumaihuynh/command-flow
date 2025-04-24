<script setup lang="ts">
import ExportDataCard from '@/components/app/setting/ExportDataCard.vue'
import ImportDataCard from '@/components/app/setting/ImportDataCard.vue'
import PageContainer from '@/components/shared/PageContainer.vue'
</script>

<template>
  <PageContainer>
    <div class="flex items-center mb-6">
      <h1 class="text-2xl font-bold">
        Setting
      </h1>
    </div>

    <div class="grid gap-6">
      <ExportDataCard />
      <ImportDataCard />
    </div>
  </PageContainer>
</template>
