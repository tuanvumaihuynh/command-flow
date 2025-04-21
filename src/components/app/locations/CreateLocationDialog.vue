<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useLocationLocalStorage } from '@/composables/use-location'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { createLocationSchema } from './schemas'

const isOpen = defineModel<boolean>('open', { required: true })

const { createLocation } = useLocationLocalStorage()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(createLocationSchema),
  initialValues: {
    name: '',
    location: '',
  },
})

const onSubmit = handleSubmit((values) => {
  createLocation(values)
  isOpen.value = false
})
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Location</DialogTitle>
        <DialogDescription>
          Add a new location to your inventory
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

          <FormField v-slot="{ componentField }" name="location" class="grid gap-2">
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
            Create
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
