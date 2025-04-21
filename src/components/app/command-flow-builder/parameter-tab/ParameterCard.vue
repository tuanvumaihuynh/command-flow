<script setup lang="ts">
import type { FlowParameter } from '@/types/command-flow'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  parameter: FlowParameter
}>()

const emit = defineEmits<{
  (e: 'edit', parameter: FlowParameter): void
  (e: 'delete', parameter: FlowParameter): void
}>()
</script>

<template>
  <div class="flex items-center p-3 border rounded-md bg-muted/40">
    <div class="flex-1">
      <div class="text-sm font-medium">
        {{ props.parameter.name }}
      </div>
      <div class="text-xs text-muted-foreground">
        Data type:
        <Badge variant="outline" class="mr-2 text-xs">
          {{ props.parameter.type }}
        </Badge>
      </div>
      <div class="text-sm text-muted-foreground">
        {{ props.parameter.description }}
      </div>
    </div>

    <div class="flex space-x-2">
      <Button variant="outline" size="icon" @click="emit('edit', props.parameter)">
        <Pencil class="w-4 h-4" />
      </Button>
      <Button variant="destructive" size="icon" @click="emit('delete', props.parameter)">
        <Trash2 class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>
