<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDashboardLocalStorage } from '@/composables/use-dashboard'
import { useLocationLocalStorage } from '@/composables/use-location'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { dashboardSchema } from './schemas'

const props = defineProps<{
  to: HTMLElement
}>()

const isOpen = defineModel<boolean>('open', { required: true })

const { dashboard } = useDashboardLocalStorage()
const { locations } = useLocationLocalStorage()

const validationSchema = toTypedSchema(dashboardSchema)

const { handleSubmit, resetForm } = useForm({
  validationSchema,
  initialValues: {
    homeLocation: dashboard.value.homeLocation,
    kitchenLocation: dashboard.value.kitchenLocation,
  },
})

const onSubmit = handleSubmit((values) => {
  dashboard.value = values
  isOpen.value = false
})

watch(isOpen, (value) => {
  if (value) {
    resetForm({
      values: {
        homeLocation: dashboard.value.homeLocation,
        kitchenLocation: dashboard.value.kitchenLocation,
      },
    })
  }
})
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent :to="props.to" class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Cấu hình vị trí</DialogTitle>
        <DialogDescription>
          Cấu hình vị trí nhà và bếp
        </DialogDescription>
      </DialogHeader>

      <form class="py-4 space-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="homeLocation">
          <FormItem>
            <FormLabel>Vị trí nhà</FormLabel>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue :value="componentField" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="location in locations" :key="location.id" :value="location.id">
                    {{ location.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="kitchenLocation">
          <FormItem>
            <FormLabel>Vị trí bếp</FormLabel>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue :value="componentField" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="location in locations" :key="location.id" :value="location.id">
                    {{ location.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter>
          <Button type="submit">
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
