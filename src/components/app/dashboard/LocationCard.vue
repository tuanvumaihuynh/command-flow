<script setup lang="ts">
import type { Location } from '@/types/location'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Send } from 'lucide-vue-next'

const props = defineProps<{
  location: Location
}>()

const emit = defineEmits<{
  (e: 'delivery', location: Location): void
}>()
</script>

<template>
  <Card
    class="transition-all duration-200 border border-slate-200 hover:shadow-md"
  >
    <CardHeader class="pb-3">
      <CardTitle class="text-xl">
        {{ props.location.name }}
      </CardTitle>
    </CardHeader>
    <CardContent class="pb-3">
      <div class="grid gap-2">
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Mã bàn:</span>
          <span class="font-medium">{{ props.location.rfidTag }}</span>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex justify-end gap-2 pt-3 border-t border-slate-100">
      <Button
        variant="default"
        size="sm"
        class="w-full"
        @click="emit('delivery', props.location)"
      >
        <Send class="w-4 h-4 mr-2" /> Giao đến bàn này
      </Button>
    </CardFooter>
  </Card>
</template>
