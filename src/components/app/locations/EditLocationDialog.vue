<script setup lang="ts">
import type { Location } from '@/types/location'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useLocationLocalStorage } from '@/composables/use-location'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { updateLocationSchema } from './schemas'

const props = defineProps<{
  location: Location
}>()

const isOpen = defineModel<boolean>('open', { required: true })

const { updateLocation } = useLocationLocalStorage()

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(updateLocationSchema),
  initialValues: {
    name: props.location.name,
    rfidTag: props.location.rfidTag,
  },
})

watch(isOpen, (newIsOpen) => {
  if (newIsOpen) {
    resetForm({
      values: {
        name: props.location.name,
        rfidTag: props.location.rfidTag,
      },
    })
  }
})

const onSubmit = handleSubmit((values) => {
  updateLocation({
    id: props.location.id,
    ...values,
  })
  isOpen.value = false
})
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Location</DialogTitle>
        <DialogDescription>
          Edit the location details
        </DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit">
        <div class="grid gap-4 py-4">
          <FormField v-slot="{ componentField }" name="name" class="grid gap-2">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <FormInput v-bind="componentField" type="text" placeholder="Enter location name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="rfidTag" class="grid gap-2">
            <FormItem>
              <FormLabel>RFID/Location Tag</FormLabel>
              <FormControl>
                <FormInput v-bind="componentField" type="text" placeholder="Enter RFID tag" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <DialogFooter>
          <Button type="submit">
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
