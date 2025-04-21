<script setup lang="ts">
import type { Command } from '@/types/command-flow'
import type { CommandInputMap, CommandType } from '@/types/raybot-command'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCommandFlowLocalStorage } from '@/composables/use-command-flow'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import DynamicCommandInputsFields from './dynamic-inputs/DynamicCommandInputsFields.vue'
import { createCommandSchema } from './schemas'

const props = defineProps<{
  id: string
  commands: Command[]
}>()

const isOpen = defineModel<boolean>('open', { required: true })

const { updateCommandFlow } = useCommandFlowLocalStorage()
const highestCommandIndex = computed(() => {
  return props.commands.reduce((acc, command) => {
    return Math.max(acc, command.index)
  }, 0)
})

const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: toTypedSchema(createCommandSchema),
  initialValues: {
    type: 'STOP_MOVEMENT',
    inputs: {},
    parameterMapping: {},
  },
})

const onSubmit = handleSubmit((values) => {
  const command: Command = {
    index: highestCommandIndex.value + 1,
    ...values,
  }

  updateCommandFlow({
    id: props.id,
    commands: [...props.commands, command],
  })

  isOpen.value = false
})

const commandType = computed({
  get() {
    return values.type
  },
  set(value: CommandType) {
    setFieldValue('type', value)
  },
})

function handleInputsUpdate(inputs: CommandInputMap[CommandType]) {
  setFieldValue('inputs', inputs)
  setFieldValue('parameterMapping', {})
}

function handleParameterMappingUpdate(parameterMapping: Record<string, string>) {
  setFieldValue('parameterMapping', parameterMapping)
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Command</DialogTitle>
        <DialogDescription>
          Create a new command to add to your command flow
        </DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit">
        <div class="grid gap-4 py-4">
          <FormField name="type" class="grid gap-2">
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select v-model="commandType">
                <SelectTrigger>
                  <SelectValue placeholder="Select a command type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STOP_MOVEMENT">
                    Stop Movement
                  </SelectItem>
                  <SelectItem value="MOVE_TO">
                    Move To
                  </SelectItem>
                  <SelectItem value="MOVE_FORWARD">
                    Move Forward
                  </SelectItem>
                  <SelectItem value="MOVE_BACKWARD">
                    Move Backward
                  </SelectItem>
                  <SelectItem value="CARGO_OPEN">
                    Cargo Open
                  </SelectItem>
                  <SelectItem value="CARGO_CLOSE">
                    Cargo Close
                  </SelectItem>
                  <SelectItem value="CARGO_LIFT">
                    Cargo Lift
                  </SelectItem>
                  <SelectItem value="CARGO_LOWER">
                    Cargo Lower
                  </SelectItem>
                  <SelectItem value="CARGO_CHECK_QR">
                    Cargo Check QR
                  </SelectItem>
                  <SelectItem value="SCAN_LOCATION">
                    Scan Location
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          </FormField>

          <!-- Dynamic inputs based on command type -->
          <DynamicCommandInputsFields
            v-if="commandType"
            :id="props.id"
            :command-type="commandType"
            @update:inputs="handleInputsUpdate"
            @update:parameter-mapping="handleParameterMappingUpdate"
          />
        </div>

        <DialogFooter>
          <Button type="submit">
            Create
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
