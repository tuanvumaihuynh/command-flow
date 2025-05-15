<script setup lang="ts">
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useCommandProcessing } from '@/composables/use-command'
import { formatDate } from '@/lib/date'
import { Loader2 } from 'lucide-vue-next'

const props = defineProps<{
  to: HTMLElement
  loading: boolean
}>()

const isOpen = computed(() => props.loading)
const { commandProcessing, refresh } = useCommandProcessing()

// Thêm interval để refetch mỗi giây khi loading là true
let refetchInterval: number | null = null

watch(() => props.loading, (isLoading) => {
  if (isLoading) {
    // Bắt đầu refetch mỗi giây khi loading là true
    refetchInterval = setInterval(() => {
      refresh()
    }, 1000) as unknown as number
  }
  else {
    // Dừng interval khi loading là false
    if (refetchInterval) {
      clearInterval(refetchInterval)
      refetchInterval = null
    }
  }
}, { immediate: false })

// Cleanup interval khi component unmount
onUnmounted(() => {
  if (refetchInterval) {
    clearInterval(refetchInterval)
  }
})
</script>

<template>
  <Dialog :open="isOpen">
    <DialogContent
      :to="props.to"
      class="flex flex-col items-center justify-center p-8 max-w-[600px]"
      @interact-outside="(e) => {
        e.preventDefault()
      }"
    >
      <Loader2 class="w-10 h-10 text-primary animate-spin" />
      <p class="mt-4 text-lg font-semibold">
        Aborting mission...
      </p>
      <p class="text-sm text-muted-foreground">
        Please wait while the mission is being aborted
      </p>
      <div v-if="commandProcessing" class="flex items-center p-2 font-mono text-sm border-t border-gray-200">
        <span class="text-sm">{{ commandProcessing.type }}</span>
        <span class="mx-2 text-gray-500">|</span>
        <span class="text-sm">{{ commandProcessing.status }}</span>
        <span class="mx-2 text-gray-500">|</span>
        <span class="text-sm">{{ commandProcessing.source }}</span>
        <span class="mx-2 text-gray-500">|</span>
        <span v-if="commandProcessing.startedAt" class="text-sm">{{ formatDate(commandProcessing.startedAt) }}</span>
      </div>
    </DialogContent>
  </Dialog>
</template>
