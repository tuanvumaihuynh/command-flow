<script setup lang="ts">
import type { CommandFlow } from '@/types/command-flow'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'
import CreateCommandDialog from './CreateCommandDialog.vue'

const props = defineProps<{
  commandFlow: CommandFlow
}>()

const showCreateDialog = ref(false)
</script>

<template>
  <div>
    <div class="flex justify-end">
      <Button @click="showCreateDialog = true">
        <Plus class="w-4 h-4" />
        Add Command
      </Button>
    </div>

    <div
      v-if="props.commandFlow.commands.length === 0"
      class="py-8 my-4 text-center border rounded-lg"
    >
      <p class="text-lg text-muted-foreground">
        No commands found
      </p>
      <p class="mt-2 text-sm text-muted-foreground">
        Click the 'Add Command' button to create your first command
      </p>
    </div>

    <div v-else>
      Hello
    </div>

    <CreateCommandDialog
      :id="props.commandFlow.id"
      v-model:open="showCreateDialog"
      :commands="props.commandFlow.commands"
    />
  </div>
</template>
