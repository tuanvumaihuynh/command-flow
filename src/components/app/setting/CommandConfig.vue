<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings } from 'lucide-vue-next'
import CommandConfigForm from './CommandConfigForm.vue'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Settings class="w-4 h-4" /> Command Configuration
      </CardTitle>
      <CardDescription>
        Configure motor speed and other parameters for robot commands.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <CommandConfigForm />
    </CardContent>
  </Card>
</template>
