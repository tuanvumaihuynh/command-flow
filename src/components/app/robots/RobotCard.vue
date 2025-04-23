<script setup lang="ts">
import type { Robot } from '@/types/robot'
import StatusIndicator from '@/components/app/robots/StatusIndicator.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Pencil, Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  robot: Robot
}>()

const emit = defineEmits<{
  (e: 'edit', robot: Robot): void
  (e: 'delete', robot: Robot): void
}>()
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-center gap-2">
        <CardTitle>{{ props.robot.name }}</CardTitle>
        <StatusIndicator :robot="props.robot" />
      </div>
    </CardHeader>
    <CardContent>
      <div class="grid gap-2">
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">IP Address:</span>
          <span class="font-medium">{{ props.robot.ipAddress }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Created:</span>
          <span>{{ new Date(props.robot.createdAt).toLocaleDateString() }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Updated:</span>
          <span>{{ new Date(props.robot.updatedAt).toLocaleDateString() }}</span>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex justify-end gap-2 pt-2 border-t border-slate-100">
      <Button
        variant="outline"
        size="icon"
        class="transition-colors rounded-md h-9 w-9 hover:bg-slate-100 hover:text-slate-900"
        @click="emit('edit', props.robot)"
      >
        <Pencil />
      </Button>
      <Button
        variant="destructive"
        size="icon"
        class="transition-colors rounded-md h-9 w-9 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
        @click="emit('delete', props.robot)"
      >
        <Trash2 />
      </Button>
    </CardFooter>
  </Card>
</template>
