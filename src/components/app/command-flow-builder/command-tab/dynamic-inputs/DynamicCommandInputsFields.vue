<script setup lang="ts">
import type { CommandInputMap, CommandType } from '@/types/raybot-command'
import { useCommandFlowLocalStorage } from '@/composables/use-command-flow'
import CargoCheckQRInputsForm from './CargoCheckQRInputsForm.vue'
import MoveToInputsForm from './MoveToInputsForm.vue'
import WaitInputsForm from './WaitInputsForm.vue'

const props = defineProps<{
  id: string
  commandType: CommandType
}>()

const emit = defineEmits<{
  (e: 'update:inputs', inputs: CommandInputMap[CommandType]): void
  (e: 'update:parameterMapping', parameterMapping: Record<string, string>): void
}>()

const { getCommandFlowById } = useCommandFlowLocalStorage()

const commandFlow = getCommandFlowById(props.id)
</script>

<template>
  <template v-if="commandFlow">
    <template v-if="props.commandType === 'MOVE_TO'">
      <MoveToInputsForm
        :parameters="commandFlow.parameters"
        @update:inputs="emit('update:inputs', $event)"
        @update:parameter-mapping="emit('update:parameterMapping', $event)"
      />
    </template>
    <template v-if="props.commandType === 'CARGO_CHECK_QR'">
      <CargoCheckQRInputsForm
        :parameters="commandFlow.parameters"
        @update:inputs="emit('update:inputs', $event)"
        @update:parameter-mapping="emit('update:parameterMapping', $event)"
      />
    </template>
    <template v-if="props.commandType === 'WAIT'">
      <WaitInputsForm
        :parameters="commandFlow.parameters"
        @update:inputs="emit('update:inputs', $event)"
        @update:parameter-mapping="emit('update:parameterMapping', $event)"
      />
    </template>
  </template>
</template>
