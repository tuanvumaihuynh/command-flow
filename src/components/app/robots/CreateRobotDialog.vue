<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useRobotLocalStorage } from '@/composables/use-robot'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { createRobotSchema } from './schemas'

const isOpen = defineModel<boolean>('open', { required: true })

const { createRobot } = useRobotLocalStorage()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(createRobotSchema),
  initialValues: {
    name: '',
    ipAddress: '',
  },
})

const onSubmit = handleSubmit((values) => {
  createRobot(values)
  isOpen.value = false
})
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Robot</DialogTitle>
        <DialogDescription>
          Add a new robot to your inventory
        </DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit">
        <div class="grid gap-4 py-4">
          <FormField v-slot="{ componentField }" name="name" class="grid gap-2">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <FormInput v-bind="componentField" type="text" placeholder="Enter robot name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="ipAddress" class="grid gap-2">
            <FormItem>
              <FormLabel>IP Address</FormLabel>
              <FormControl>
                <FormInput v-bind="componentField" type="text" placeholder="Enter IP address" />
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
