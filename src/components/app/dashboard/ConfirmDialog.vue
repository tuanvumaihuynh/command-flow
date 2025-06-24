<script setup lang="ts">
import type { Location } from '@/types/location'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useDelivery } from '@/composables/use-delivery'

const props = defineProps<{
  to: HTMLElement
}>()

const isOpen = defineModel<boolean>('open', { required: true })
const location = defineModel<Location>('location', { required: true })

const { delivery } = useDelivery()
const isLoading = ref(false)

async function handleConfirmDelivery() {
  isLoading.value = true
  try {
    await delivery(location.value)
    notification.success({
      message: 'Task assigned successfully',
    })
  }
  catch (error) {
    notification.error({
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
  finally {
    isOpen.value = false
    isLoading.value = false
  }
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent
      :to="props.to"
    >
      <DialogHeader>
        <DialogTitle>Confirm delivery</DialogTitle>
        <DialogDescription>
          Are you sure you want to deliver the order to
          <span class="font-semibold">{{ location.name }}</span>?
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button :disabled="isLoading" @click="handleConfirmDelivery">
          {{ isLoading ? 'Assigning task...' : 'Confirm' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
