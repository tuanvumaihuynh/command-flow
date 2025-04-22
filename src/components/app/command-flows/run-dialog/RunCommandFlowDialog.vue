<script setup lang="ts">
import type { CommandFlow } from '@/types/command-flow'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import ParameterField from './ParameterField.vue'
import RobotSelect from './RobotSelect.vue'

const props = defineProps<{
  commandFlow: CommandFlow
}>()

const isOpen = defineModel<boolean>('open', { required: true })
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ props.commandFlow.name }}</DialogTitle>
        <DialogDescription>
          {{ props.commandFlow.description }}
        </DialogDescription>
      </DialogHeader>

      <form>
        <div class="grid gap-2 py-4">
          <h3 class="font-medium">
            Parameters
          </h3>
          <div
            v-if="Object.keys(props.commandFlow.parameters).length > 0"
            class="flex flex-col items-center gap-4"
          >
            <div
              v-for="parameter in props.commandFlow.parameters"
              :key="parameter.id"
              class="grid items-center w-full grid-cols-4 gap-2"
            >
              <Label class="text-right">{{ parameter.name }}</Label>
              <ParameterField class="col-span-3" :parameter-type="parameter.type" />
            </div>
          </div>
          <p v-else>
            No parameters for this command flow
          </p>
        </div>

        <div class="grid gap-2 py-4">
          <h3 class="font-medium">
            Target robot
          </h3>
          <RobotSelect />
        </div>
      </form>

      <div class="pt-4">
        <h3 class="mb-2 font-medium">
          Command Summary
        </h3>
        <div class="p-3 rounded-md bg-muted">
          <p>Total commands: {{ props.commandFlow.commands.length }}</p>
          <p>
            Total parameters: {{ Object.keys(props.commandFlow.parameters).length }}
          </p>
        </div>
      </div>

      <DialogFooter>
        <Button type="submit">
          Run
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
