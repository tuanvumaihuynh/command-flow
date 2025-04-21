<script setup lang="ts">
import type { CommandFlow } from '@/types/command-flow'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Pencil, Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  commandFlow: CommandFlow
}>()

const emit = defineEmits<{
  (e: 'edit', commandFlow: CommandFlow): void
  (e: 'delete', commandFlow: CommandFlow): void
}>()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ props.commandFlow.name }}</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid gap-2">
        <div v-if="props.commandFlow.description" class="mb-2 text-sm">
          {{ props.commandFlow.description }}
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Commands:</span>
          <span class="font-medium">{{ props.commandFlow.commands.length }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Parameters:</span>
          <span class="font-medium">{{ props.commandFlow.parameters.length }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Created:</span>
          <span>{{ new Date(props.commandFlow.createdAt).toLocaleDateString() }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-muted-foreground">Updated:</span>
          <span>{{ new Date(props.commandFlow.updatedAt).toLocaleDateString() }}</span>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex justify-end gap-2 pt-2 border-t border-slate-100">
      <Button
        variant="outline"
        size="icon"
        class="transition-colors rounded-md h-9 w-9 hover:bg-slate-100 hover:text-slate-900"
        @click="emit('edit', props.commandFlow)"
      >
        <Pencil />
      </Button>
      <Button
        variant="outline"
        size="icon"
        class="transition-colors rounded-md h-9 w-9 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
        @click="emit('delete', props.commandFlow)"
      >
        <Trash2 />
      </Button>
    </CardFooter>
  </Card>
</template>
