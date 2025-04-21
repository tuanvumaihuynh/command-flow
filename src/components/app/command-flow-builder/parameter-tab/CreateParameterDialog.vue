<script setup lang="ts">
import type { FlowParameter } from '@/types/command-flow'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCommandFlowLocalStorage } from '@/composables/use-command-flow'
import { generateId } from '@/lib/id'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { createParameterSchema } from './schemas'

const props = defineProps<{
  id: string
  parameters: FlowParameter[]
}>()

const isOpen = defineModel<boolean>('open', { required: true })

const { updateCommandFlow } = useCommandFlowLocalStorage()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(createParameterSchema),
  initialValues: {
    name: '',
    type: 'string',
    description: '',
  },
})

const onSubmit = handleSubmit((values) => {
  const parameter: FlowParameter = {
    id: generateId(),
    ...values,
  }

  updateCommandFlow({
    id: props.id,
    parameters: [...props.parameters, parameter],
  })

  isOpen.value = false
})
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Parameter</DialogTitle>
        <DialogDescription>
          Create a new parameter to use in your command flow
        </DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit">
        <div class="grid gap-4 py-4">
          <FormField v-slot="{ componentField }" name="name" class="grid gap-2">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <FormInput v-bind="componentField" type="text" placeholder="Enter parameter name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="type" class="grid gap-2">
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parameter type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="string">
                    String
                  </SelectItem>
                  <SelectItem value="number">
                    Number
                  </SelectItem>
                  <SelectItem value="boolean">
                    Boolean
                  </SelectItem>
                  <SelectItem value="location">
                    Location
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="description">
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea v-bind="componentField" placeholder="Enter description (optional)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
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
