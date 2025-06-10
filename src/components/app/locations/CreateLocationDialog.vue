<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
    rfidTag: '',
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
        <div class="grid gap-4 max-h-[70vh] overflow-y-auto px-px">
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
              <FormLabel>Lower Position (cm)</FormLabel>
              <FormControl>
                <FormInput
                  v-bind="componentField" type="number" placeholder="Enter lower position"
                  :default-value="240"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="speedGoToHome" class="grid gap-2">
            <FormItem>
              <FormLabel>Speed to go to home (%)</FormLabel>
              <FormControl>
                <FormInput
                  v-bind="componentField" type="number" placeholder="Enter speed to go to home"
                  :default-value="100"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="speedGoToKitchen" class="grid gap-2">
            <FormItem>
              <FormLabel>Speed to go to kitchen (%)</FormLabel>
              <FormControl>
                <FormInput
                  v-bind="componentField" type="number" placeholder="Enter speed to go to kitchen"
                  :default-value="100"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="speedDelivery" class="grid gap-2">
            <FormItem>
              <FormLabel>Speed to deliver (%)</FormLabel>
              <FormControl>
                <FormInput
                  v-bind="componentField" type="number" placeholder="Enter speed to deliver"
                  :default-value="80"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="directionToHome">
            <FormItem>
              <FormLabel>Direction to home</FormLabel>
              <Select v-bind="componentField" default-value="FORWARD">
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

        <DialogFooter class="pt-4">
          <Button type="submit">
            Create
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
