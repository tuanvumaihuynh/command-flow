<script setup lang="ts">
import type { ParameterType } from '@/types/command-flow'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLocationLocalStorage } from '@/composables/use-location'

const props = defineProps<{
  parameterType: ParameterType
}>()

const { locations } = useLocationLocalStorage()
</script>

<template>
  <template v-if="props.parameterType === 'string'">
    <Input type="text" />
  </template>
  <template v-else-if="props.parameterType === 'number'">
    <Input type="number" />
  </template>
  <template v-else-if="props.parameterType === 'boolean'">
    <Checkbox />
  </template>
  <template v-else-if="props.parameterType === 'location'">
    <Select>
      <SelectTrigger class="w-[345px]">
        <SelectValue placeholder="Select a location" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="location in locations" :key="location.rfidTag" :value="location.rfidTag">
          {{ location.name }} ({{ location.rfidTag }})
        </SelectItem>
      </SelectContent>
    </Select>
  </template>
</template>
