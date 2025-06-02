<script setup lang="ts">
import type { Location } from '@/types/location'
import CreateLocationDialog from '@/components/app/locations/CreateLocationDialog.vue'
import EditLocationDialog from '@/components/app/locations/EditLocationDialog.vue'
import LocationCard from '@/components/app/locations/LocationCard.vue'
import PageContainer from '@/components/shared/PageContainer.vue'
import Button from '@/components/ui/button/Button.vue'
import { useLocationLocalStorage } from '@/composables/use-location'
import { Plus } from 'lucide-vue-next'

const { locations, deleteLocation } = useLocationLocalStorage()

const selectedLocation = ref<Location | null>(null)

const showCreateDialog = ref(false)
const showEditDialog = ref(false)

function handleEdit(location: Location) {
  selectedLocation.value = location
  showEditDialog.value = true
}

function handleDelete(location: Location) {
  selectedLocation.value = location
  deleteLocation(location.id)
}
</script>

<template>
  <PageContainer>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">
        Locations
      </h1>
      <Button @click="showCreateDialog = true">
        <Plus class="w-4 h-4" />
        Add Location
      </Button>
    </div>

    <div v-if="locations.length === 0" class="py-8 my-12 text-center border rounded-lg">
      <p class="text-lg text-muted-foreground">
        No locations found
      </p>
      <p class="mt-2 text-sm text-muted-foreground">
        Click the 'Add Location' button to create your first location
      </p>
    </div>

    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <LocationCard
        v-for="location in locations"
        :key="location.id"
        :location="location"
        @edit="handleEdit(location)"
        @delete="handleDelete(location)"
      />
    </div>

    <CreateLocationDialog v-model:open="showCreateDialog" />
    <EditLocationDialog v-if="selectedLocation" v-model:open="showEditDialog" :location="selectedLocation" />
  </PageContainer>
</template>
