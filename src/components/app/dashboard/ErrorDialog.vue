<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CircleAlert } from 'lucide-vue-next'

const props = defineProps<{
  to: HTMLElement
}>()
const isOpen = defineModel<boolean>('open', { required: true })
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-[425px]" :to="props.to">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2 text-destructive">
          <CircleAlert /> Error
        </DialogTitle>
        <DialogDescription>
          <span class="text-destructive">Home, kitchen or robot not configured</span>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
