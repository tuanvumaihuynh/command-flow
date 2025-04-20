<script setup lang="ts">
import type { Location } from '@/types/location'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Pencil, Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  location: Location
}>()

const emit = defineEmits<{
  (e: 'edit', location: Location): void
  (e: 'delete', location: Location): void
}>()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ props.location.name }}</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid gap-2">
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">RFID Tag:</span>
          <span class="font-medium">{{ props.location.location }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Created:</span>
          <span>{{ new Date(props.location.createdAt).toLocaleDateString() }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Updated:</span>
          <span>{{ new Date(props.location.updatedAt).toLocaleDateString() }}</span>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex justify-end gap-2 pt-2 border-t border-slate-100">
      <Button
        variant="outline"
        size="icon"
        class="transition-colors rounded-md h-9 w-9 hover:bg-slate-100 hover:text-slate-900"
        @click="emit('edit', props.location)"
      >
        <Pencil />
      </Button>
      <Button
        variant="outline"
        size="icon"
        class="transition-colors rounded-md h-9 w-9 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
        @click="emit('delete', props.location)"
      >
        <Trash2 />
      </Button>
    </CardFooter>
  </Card>
</template>
