<script setup lang="ts">
import type { CommandFlow, FlowParameter } from '@/types/command-flow'
import { Button } from '@/components/ui/button'
import { useCommandFlowLocalStorage } from '@/composables/use-command-flow'
import { Plus } from 'lucide-vue-next'
import CreateParameterDialog from './CreateParameterDialog.vue'
import ParameterCard from './ParameterCard.vue'

const props = defineProps<{
  commandFlow: CommandFlow
}>()

const isOpen = ref(false)

const { updateCommandFlow } = useCommandFlowLocalStorage()

function deleteParameter(parameter: FlowParameter) {
  const cf = props.commandFlow
  cf.parameters = cf.parameters.filter(p => p.id !== parameter.id)
  updateCommandFlow(cf)
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-end">
      <Button @click="isOpen = true">
        <Plus class="w-4 h-4" />
        Add Parameter
      </Button>
    </div>

    <div
      v-if="props.commandFlow.parameters.length === 0"
      class="py-8 my-4 text-center border rounded-lg"
    >
      <p class="text-lg text-muted-foreground">
        No parameters found
      </p>
      <p class="mt-2 text-sm text-muted-foreground">
        Click the 'Add Parameter' button to create your first parameter
      </p>
    </div>

    <div v-else class="grid gap-4">
      <ParameterCard
        v-for="parameter in props.commandFlow.parameters"
        :key="parameter.id"
        :parameter="parameter"
        @delete="deleteParameter(parameter)"
      />
    </div>

    <CreateParameterDialog
      :id="props.commandFlow.id"
      v-model:open="isOpen"
      :parameters="props.commandFlow.parameters"
    />
  </div>
</template>
