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
  (e: 'update:inputs', inputs: CommandInputMap['CARGO_CHECK_QR']): void
  (e: 'update:parameterMapping', parameterMapping: Record<string, string>): void
}>()

const useParameter = ref(false)

function handleParameterChange(value: string) {
  emit('update:parameterMapping', {
    qrCode: value,
  })
}

function handleLocationChange(value: string) {
  emit('update:inputs', {
    qrCode: value,
  })
}
</script>

<template>
  <div>QR Code</div>
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
              return param.type === 'string'
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
      <Label>QR Code</Label>
      <Input
        type="text"
        placeholder="Enter QR code"
        @update:model-value="(val) => {
          handleLocationChange(val as string)
        }"
      />
    </div>
  </div>
</template>
