<script setup lang="ts">
import type { FlowParameter } from '@/types/command-flow'
import type { CommandInputMap } from '@/types/raybot-command'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

const props = defineProps<{
  parameters: FlowParameter[]
}>()

const emit = defineEmits<{
  (e: 'update:inputs', inputs: CommandInputMap['WAIT']): void
  (e: 'update:parameterMapping', parameterMapping: Record<string, string>): void
}>()

const useParameter = ref(false)

function handleParameterChange(value: string) {
  emit('update:parameterMapping', {
    durationMs: value,
  })
}

function handleDurationMsChange(value: number) {
  emit('update:inputs', {
    durationMs: value,
  })
}
</script>

<template>
  <div>Duration (ms)</div>
  <div class="grid items-center">
    <div class="flex items-center gap-2">
      <Label>Use Parameter</Label>
      <Switch v-model="useParameter" />
    </div>

    <div v-if="useParameter">
      <Label>Parameter</Label>
      <Select
        @update:model-value="(val) => {
          handleParameterChange(val as string)
        }"
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a parameter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="parameter in props.parameters.filter((param) => {
              return param.type === 'number'
            })"
            :key="parameter.id"
            :value="parameter.id"
          >
            {{ parameter.name }} ({{ parameter.type }})
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div v-else>
      <Label>Duration (ms)</Label>
      <Input
        type="number"
        placeholder="Enter duration in ms"
        @update:model-value="(val) => {
          handleDurationMsChange(val as number)
        }"
      />
    </div>
  </div>
</template>
