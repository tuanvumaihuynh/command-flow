<script setup lang="ts">
import type { Command, CommandFlow } from '@/types/command-flow'
import { Button } from '@/components/ui/button'
import { useCommandFlowLocalStorage } from '@/composables/use-command-flow'
import { Plus } from 'lucide-vue-next'
import CommandCard from './CommandCard.vue'
import CreateCommandDialog from './CreateCommandDialog.vue'

const props = defineProps<{
  commandFlow: CommandFlow
}>()

const showCreateDialog = ref(false)

const { updateCommandFlow } = useCommandFlowLocalStorage()

function handleMoveUpCommand(command: Command) {
  const index = props.commandFlow.commands.indexOf(command)
  if (index > 0) {
    const newCommands = [...props.commandFlow.commands]
    const temp = newCommands[index - 1]
    newCommands[index - 1] = newCommands[index]
    newCommands[index] = temp
    updateCommandFlow({
      id: props.commandFlow.id,
      commands: newCommands,
    })
  }
}

function handleMoveDownCommand(command: Command) {
  const index = props.commandFlow.commands.indexOf(command)
  if (index < props.commandFlow.commands.length - 1) {
    const newCommands = [...props.commandFlow.commands]
    const temp = newCommands[index + 1]
    newCommands[index + 1] = newCommands[index]
    newCommands[index] = temp
    updateCommandFlow({
      id: props.commandFlow.id,
      commands: newCommands,
    })
  }
}

function handleEditCommand(_: Command) {
}

function handleDeleteCommand(command: Command) {
  const newCommands = props.commandFlow.commands.filter(c => c.index !== command.index)
  updateCommandFlow({
    id: props.commandFlow.id,
    commands: newCommands,
  })
}
</script>

<template>
  <div class="space-y-4">
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

    <div v-else class="space-y-2">
      <CommandCard
        v-for="command in props.commandFlow.commands"
        :key="command.index"
        :command="command"
        @move-up="handleMoveUpCommand"
        @move-down="handleMoveDownCommand"
        @edit="handleEditCommand"
        @delete="handleDeleteCommand"
      />
    </div>

    <CreateCommandDialog
      :id="props.commandFlow.id"
      v-model:open="showCreateDialog"
      :commands="props.commandFlow.commands"
    />
  </div>
</template>
