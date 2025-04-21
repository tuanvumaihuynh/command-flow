<script setup lang="ts">
import type { FlowParameter } from '@/types/command-flow'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Pencil, Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  parameter: FlowParameter
}>()

const emit = defineEmits<{
  (e: 'edit', parameter: FlowParameter): void
  (e: 'delete', parameter: FlowParameter): void
}>()
</script>

<template>
  <Card class="flex justify-between">
    <CardHeader>
      <CardTitle>{{ props.parameter.name }}</CardTitle>
      <CardDescription>Type: {{ props.parameter.type }}</CardDescription>
      <p class="mt-2 text-sm">
        {{ props.parameter.description }}
      </p>
    </CardHeader>
    <CardFooter class="flex justify-end gap-2 pt-2">
      <Button variant="outline" size="icon" @click="emit('edit', props.parameter)">
        <Pencil />
      </Button>
      <Button variant="outline" size="icon" @click="emit('delete', props.parameter)">
        <Trash2 />
      </Button>
    </CardFooter>
  </Card>
</template>
