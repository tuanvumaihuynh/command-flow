<script setup lang="ts">
import type { Location } from '@/types/location'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
    lowerPosition: props.location.lowerPosition,
    speedGoToHome: props.location.speedGoToHome,
    speedGoToKitchen: props.location.speedGoToKitchen,
    speedDelivery: props.location.speedDelivery,
    directionToHome: props.location.directionToHome,
  },
})

watch(isOpen, (newIsOpen) => {
  if (newIsOpen) {
    resetForm({
      values: {
        name: props.location.name,
        rfidTag: props.location.rfidTag,
        lowerPosition: props.location.lowerPosition,
        speedGoToHome: props.location.speedGoToHome,
        speedGoToKitchen: props.location.speedGoToKitchen,
        speedDelivery: props.location.speedDelivery,
        directionToHome: props.location.directionToHome,
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
      <div class="max-h-[80vh] overflow-y-auto px-px">
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

            <FormField v-slot="{ componentField }" name="lowerPosition" class="grid gap-2">
              <FormItem>
                <FormLabel>Lower Position</FormLabel>
                <FormControl>
                  <FormInput v-bind="componentField" type="number" placeholder="Enter lower position" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="speedGoToHome" class="grid gap-2">
              <FormItem>
                <FormLabel>Speed to go to home</FormLabel>
                <FormControl>
                  <FormInput v-bind="componentField" type="number" placeholder="Enter speed to go to home" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="speedGoToKitchen" class="grid gap-2">
              <FormItem>
                <FormLabel>Speed to go to kitchen</FormLabel>
                <FormControl>
                  <FormInput v-bind="componentField" type="number" placeholder="Enter speed to go to kitchen" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="speedDelivery" class="grid gap-2">
              <FormItem>
                <FormLabel>Speed to deliver</FormLabel>
                <FormControl>
                  <FormInput v-bind="componentField" type="number" placeholder="Enter speed to deliver" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="directionToHome">
              <FormItem>
                <FormLabel>Direction to home</FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="FORWARD">
                        Forward
                      </SelectItem>
                      <SelectItem value="BACKWARD">
                        Backward
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
      </div>
    </DialogContent>
  </Dialog>
</template>
