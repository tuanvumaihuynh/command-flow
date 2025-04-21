<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useCommandFlowLocalStorage } from '@/composables/use-command-flow'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { createCommandFlowSchema } from './schemas'

const isOpen = defineModel<boolean>('open', { required: true })

const { createCommandFlow } = useCommandFlowLocalStorage()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(createCommandFlowSchema),
  initialValues: {
    name: '',
    description: '',
  },
})

const onSubmit = handleSubmit((values) => {
  createCommandFlow({
    parameters: [],
    commands: [],
    ...values,
  })
  isOpen.value = false
})
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Command Flow</DialogTitle>
        <DialogDescription>
          Create a new command flow to automate your robot's actions
        </DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit">
        <div class="grid gap-4 py-4">
          <FormField v-slot="{ componentField }" name="name" class="grid gap-2">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <FormInput v-bind="componentField" type="text" placeholder="Enter command flow name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="description" class="grid gap-2">
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
