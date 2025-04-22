<script setup lang="ts">
import type { Location } from '@/types/location'
import ConfirmDialog from '@/components/app/dashboard/ConfirmDialog.vue'
import LocationCard from '@/components/app/dashboard/LocationCard.vue'
import { Button } from '@/components/ui/button'
import { useDelivery } from '@/composables/use-delivery'
import { useLocationLocalStorage } from '@/composables/use-location'
import { cn } from '@/lib/utils'
import { useFullscreen } from '@vueuse/core'
import { Maximize, Minimize } from 'lucide-vue-next'

const contentDiv = ref<HTMLElement | null>(null)
const { isFullscreen, toggle } = useFullscreen(contentDiv)

const { locations } = useLocationLocalStorage()
const selectedLocation = ref<Location | null>(null)

const showConfirmDialog = ref(false)
const { delivery } = useDelivery()

function handleDelivery(location: Location) {
  selectedLocation.value = location
  showConfirmDialog.value = true
}

function handleConfirmDelivery() {
  if (!selectedLocation.value)
    return

  delivery(selectedLocation.value.rfidTag)

  showConfirmDialog.value = false
  selectedLocation.value = null
}
</script>

<template>
  <div ref="contentDiv" :class="cn(isFullscreen && 'min-h-screen bg-background', 'container p-6')">
    <div>
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">
          Dashboard
        </h1>

        <Button variant="outline" size="icon" @click="toggle">
          <Maximize v-if="!isFullscreen" class="w-4 h-4" />
          <Minimize v-else class="w-4 h-4" />
        </Button>
      </div>

      <div v-if="locations.length === 0" class="py-8 my-12 text-center border rounded-lg">
        <p class="text-lg text-muted-foreground">
          Không tìm thấy bàn nào
        </p>
        <p class="mt-2 text-sm text-muted-foreground">
          Vui lòng thêm bàn trong phần Quản lý Bàn
        </p>
      </div>

      <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <LocationCard
          v-for="location in locations"
          :key="location.id"
          :location="location"
          @delivery="handleDelivery"
        />
      </div>
    </div>

    <ConfirmDialog
      v-model:open="showConfirmDialog"
      :name="selectedLocation?.name ?? ''"
      @confirm="handleConfirmDelivery"
    />
  </div>
</template>
