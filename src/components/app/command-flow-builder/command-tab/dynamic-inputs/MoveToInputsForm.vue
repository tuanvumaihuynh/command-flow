<script setup lang="ts">
import type { FlowParameter } from '@/types/command-flow'
import type { CommandInputMap } from '@/types/raybot-command'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useLocationLocalStorage } from '@/composables/use-location'

const props = defineProps<{
  parameters: FlowParameter[]
}>()

const emit = defineEmits<{
  (e: 'update:inputs', inputs: CommandInputMap['MOVE_TO']): void
  (e: 'update:parameterMapping', parameterMapping: Record<string, string>): void
}>()

const useParameter = ref(false)

const { locations } = useLocationLocalStorage()

function handleParameterChange(value: string) {
  emit('update:parameterMapping', {
    location: value,
  })
}

function handleLocationChange(value: string) {
  emit('update:inputs', {
    location: value,
  })
}
</script>

<template>
  <div>Location</div>
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
              return param.type === 'location' || param.type === 'string'
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
      <Label>Location</Label>
      <Select
        @update:model-value="(val) => {
          handleLocationChange(val as string)
        }"
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="location in locations"
            :key="location.id"
            :value="location.rfidTag"
          >
            {{ location.name }} ({{ location.rfidTag }})
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>
