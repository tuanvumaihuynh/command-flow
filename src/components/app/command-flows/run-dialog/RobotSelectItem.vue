<script setup lang="ts">
import type { Robot } from '@/types/robot'
import { RaybotHealthAPI } from '@/api/raybot-health'
import { SelectItem } from '@/components/ui/select'
import { createRaybotHTTPClient } from '@/lib/http'
import { useIntervalFn } from '@vueuse/core'

const props = defineProps<{
  robot: Robot
}>()

const raybotHealthAPI = new RaybotHealthAPI(createRaybotHTTPClient(props.robot.ipAddress))

const isOnline = ref(false)

async function fetchHealthStatus() {
  try {
    await raybotHealthAPI.getHealth()
    isOnline.value = true
  }
  catch {
    isOnline.value = false
  }
}

const REFRESH_INTERVAL = 3000
const { resume, pause } = useIntervalFn(fetchHealthStatus, REFRESH_INTERVAL)

onMounted(async () => {
  await fetchHealthStatus()
  resume()
})

onUnmounted(() => {
  pause()
})
</script>

<template>
  <SelectItem :value="props.robot.id" :disabled="!isOnline">
    <div class="flex items-center gap-2">
      <span class="font-medium">
        {{ props.robot.name }}
      </span>
      <div class="flex items-center gap-1">
        <div
          class="w-2.5 h-2.5 rounded-full"
          :class="{
            'bg-green-500': isOnline,
            'bg-red-500': !isOnline,
          }"
        />
        <span class="text-xs">
          {{ isOnline ? 'Online' : 'Offline' }}
        </span>
      </div>
    </div>
  </SelectItem>
</template>
