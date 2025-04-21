<script setup lang="ts">
import type { Command } from '@/types/command-flow'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoveDown, MoveUp, Pencil, Trash2 } from 'lucide-vue-next'
import { getCommandLabel } from './utils'

const props = defineProps<{
  command: Command
}>()

const emit = defineEmits<{
  (e: 'moveUp', command: Command): void
  (e: 'moveDown', command: Command): void
  (e: 'edit', command: Command): void
  (e: 'delete', command: Command): void
}>()
</script>

<template>
  <div class="flex items-center p-3 border rounded-md bg-muted/40">
    <div class="px-2 py-1 mr-4 font-mono text-sm rounded bg-primary/10">
      {{ props.command.index }}
    </div>
    <div class="flex-1">
      <div class="text-sm font-medium">
        {{ getCommandLabel(props.command) }}
      </div>
      <div class="text-sm text-muted-foreground">
        {{ command.type.replace(/_/g, " ") }}
        <template v-if="props.command.parameterMapping && Object.keys(props.command.parameterMapping).length > 0">
          <Badge variant="outline" class="ml-2 text-xs">
            Parameterized
          </Badge>
        </template>
      </div>
    </div>

    <div class="flex space-x-2">
      <Button variant="ghost" size="icon" @click="emit('moveUp', props.command)">
        <MoveUp class="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon" @click="emit('moveDown', props.command)">
        <MoveDown class="w-4 h-4" />
      </Button>
      <Button variant="outline" size="icon" @click="emit('edit', props.command)">
        <Pencil class="w-4 h-4" />
      </Button>
      <Button variant="destructive" size="icon" @click="emit('delete', props.command)">
        <Trash2 class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>
