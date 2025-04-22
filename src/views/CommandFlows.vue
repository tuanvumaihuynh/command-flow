<script setup lang="ts">
import type { CommandFlow } from '@/types/command-flow'
import CommandFlowCard from '@/components/app/command-flows/CommandFlowCard.vue'
import CreateCommandFlowDialog from '@/components/app/command-flows/CreateCommandFlowDialog.vue'
import RunCommandFlowDialog from '@/components/app/command-flows/run-dialog/RunCommandFlowDialog.vue'
import PageContainer from '@/components/shared/PageContainer.vue'
import { Button } from '@/components/ui/button'
import { useCommandFlowLocalStorage } from '@/composables/use-command-flow'
import { Plus } from 'lucide-vue-next'

const { commandFlows, deleteCommandFlow } = useCommandFlowLocalStorage()

const selectedCommandFlow = ref<CommandFlow | null>(null)
const showCreateDialog = ref(false)
const showRunDialog = ref(false)
const router = useRouter()

function handleRun(commandFlow: CommandFlow) {
  selectedCommandFlow.value = commandFlow
  showRunDialog.value = true
}

function handleEdit(commandFlow: CommandFlow) {
  router.push(`/command-flows/${commandFlow.id}`)
}

function handleDelete(commandFlow: CommandFlow) {
  selectedCommandFlow.value = commandFlow
  deleteCommandFlow(commandFlow.id)
}
</script>

<template>
  <PageContainer>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">
        Command Flows
      </h1>
      <Button @click="showCreateDialog = true">
        <Plus class="w-4 h-4" />
        Add Command Flow
      </Button>
    </div>

    <div v-if="commandFlows.length === 0" class="py-8 my-12 text-center border rounded-lg">
      <p class="text-lg text-muted-foreground">
        No command flows found
      </p>
      <p class="mt-2 text-sm text-muted-foreground">
        Click the 'Add Command Flow' button to create your first command flow
      </p>
    </div>

    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CommandFlowCard
        v-for="commandFlow in commandFlows"
        :key="commandFlow.id"
        :command-flow="commandFlow"
        @run="handleRun"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <CreateCommandFlowDialog v-model:open="showCreateDialog" />
    <RunCommandFlowDialog
      v-if="selectedCommandFlow"
      v-model:open="showRunDialog"
      :command-flow="selectedCommandFlow"
    />
  </PageContainer>
</template>
