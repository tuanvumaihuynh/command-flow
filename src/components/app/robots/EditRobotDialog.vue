<script setup lang="ts">
import type { Robot } from '@/types/robot'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRobotLocalStorage } from '@/composables/use-robot'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { updateRobotSchema } from './schemas'

const props = defineProps<{
  robot: Robot
}>()

const isOpen = defineModel<boolean>('open', { required: true })

const { updateRobot } = useRobotLocalStorage()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(updateRobotSchema),
  initialValues: {
    name: props.robot.name,
    ipAddress: props.robot.ipAddress,
  },
})

const onSubmit = handleSubmit((values) => {
  updateRobot({
    id: props.robot.id,
    ...values,
  })
  isOpen.value = false
})
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Robot</DialogTitle>
        <DialogDescription>
          Update robot information
        </DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit">
        <div class="grid gap-4 py-4">
          <FormField v-slot="{ componentField }" name="name" class="grid gap-2">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input v-bind="componentField" type="text" placeholder="Enter robot name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="ipAddress" class="grid gap-2">
            <FormItem>
              <FormLabel>IP Address</FormLabel>
              <FormControl>
                <Input v-bind="componentField" type="text" placeholder="Enter IP address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <DialogFooter>
          <Button type="submit">
            Update
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
