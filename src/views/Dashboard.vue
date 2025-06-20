<script setup lang="ts">
import type { Location } from '@/types/location'
import AbortLoadingDialog from '@/components/app/dashboard/AbortLoadingDialog.vue'
import ConfigDialog from '@/components/app/dashboard/ConfigDialog.vue'
import ConfirmDialog from '@/components/app/dashboard/ConfirmDialog.vue'
import LocationCard from '@/components/app/dashboard/LocationCard.vue'
import { Button } from '@/components/ui/button'
import { useAbort } from '@/composables/use-abort'
import { useLocationLocalStorage } from '@/composables/use-location'
import { cn } from '@/lib/utils'
import { useConfirmationStore } from '@/stores/confirmation-store'
import { useFullscreen } from '@vueuse/core'
import { CircleAlert, Loader2, Maximize, Minimize, Settings } from 'lucide-vue-next'

const contentDiv = useTemplateRef('contentDiv')
const { isFullscreen, toggle } = useFullscreen(contentDiv)

const { locations } = useLocationLocalStorage()
const targetDeliveryLocation = ref<Location | null>(null)

const { openConfirmation } = useConfirmationStore()
const { abort, loading: abortLoading, isValid } = useAbort()
const showConfirmDialog = ref(false)
const showConfigDialog = ref(false)

function handleDelivery(location: Location) {
  targetDeliveryLocation.value = location
  showConfirmDialog.value = true
}

function handleAbort() {
  openConfirmation({
    title: 'Abort mission',
    description: 'Are you sure you want to abort the mission?',
    to: contentDiv.value!,
    actionLabel: 'Confirm',
    cancelLabel: 'Cancel',
    onAction: () => {
      abort()
    },
    onCancel: () => {
    },
  })
}
</script>

<template>
  <div ref="contentDiv" :class="cn(isFullscreen && 'min-h-screen bg-background overflow-auto', 'container p-6')">
    <div>
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold tracking-tight">
          Delivery dashboard
        </h1>
        <div class="flex items-center gap-4">
          <Button class="!text-warning" variant="destructive" @click="handleAbort">
            <span class="flex items-center gap-2">
              <Loader2 v-if="abortLoading" class="w-4 h-4 animate-spin !text-warning" />
              <CircleAlert v-else class="w-4 h-4 !text-warning" />
              Abort Mission
            </span>
          </Button>

          <ConfigDialog v-model:open="showConfigDialog" :to="contentDiv!">
            <Button>
              <Settings class="w-4 h-4" />
              <span class="hidden md:block">
                Config
              </span>
            </Button>
          </ConfigDialog>
          <Button variant="outline" size="icon" @click="toggle">
            <Maximize v-if="!isFullscreen" class="w-4 h-4" />
            <Minimize v-else class="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div v-if="locations.length === 0" class="py-8 my-12 text-center border rounded-lg">
        <p class="text-lg text-muted-foreground">
          No location found
        </p>
        <p class="mt-2 text-sm text-muted-foreground">
          Please add a location in the Location Management section
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
      v-if="targetDeliveryLocation"
      v-model:open="showConfirmDialog"
      v-model:location="targetDeliveryLocation"
      :to="contentDiv!"
    />

    <AbortLoadingDialog
      v-if="isValid"
      :loading="abortLoading"
      :to="contentDiv!"
    />
  </div>
</template>
