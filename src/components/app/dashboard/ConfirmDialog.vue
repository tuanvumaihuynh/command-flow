<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const props = defineProps<{
  name: string
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const isOpen = defineModel<boolean>('open', { required: true })
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle>Xác nhận giao hàng</DialogTitle>
        <DialogDescription>
          Bạn có chắc chắn muốn giao món ăn đến bàn
          <span class="font-semibold">{{ props.name }}</span>?
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button @click="emit('confirm')">
          Xác nhận giao hàng
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
