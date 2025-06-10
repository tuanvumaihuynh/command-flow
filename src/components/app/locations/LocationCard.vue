<script setup lang="ts">
import type { Location } from '@/types/location'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/date'
import {
  ArrowDown,
  ChefHat,
  Gauge,
  Home,
  MapPin,
  Navigation,
  Pencil,
  Tag,
  Trash2,
  Truck,
} from 'lucide-vue-next'

const props = defineProps<{
  location: Location
}>()

const emit = defineEmits<{
  (e: 'edit', location: Location): void
  (e: 'delete', location: Location): void
}>()

function getDirection(direction: 'FORWARD' | 'BACKWARD') {
  return direction === 'FORWARD' ? 'Forward' : 'Backward'
}
</script>

<template>
  <Card class="overflow-hidden transition-shadow duration-200 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-gray-900/20">
    <CardHeader class="border-b">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <MapPin class="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <CardTitle class="text-base font-semibold text-gray-900 dark:text-gray-100">
            {{ props.location.name }}
          </CardTitle>
        </div>
        <Badge variant="secondary" class="text-xs text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/50">
          <Tag class="w-3 h-3 mr-1" />
          {{ props.location.rfidTag }}
        </Badge>
      </div>
    </CardHeader>

    <CardContent class="p-4 space-y-3">
      <!-- Position & Direction -->
      <div class="space-y-2 text-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <ArrowDown class="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span class="font-medium">Lower Position (cm)</span>
          </div>
          <span class="font-medium">{{ props.location.lowerPosition }}</span>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Navigation class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span class="font-medium">Direction to home</span>
          </div>
          <span class="font-medium">{{ getDirection(props.location.directionToHome) }}</span>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Navigation class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span class="font-medium">Direction to location</span>
          </div>
          <span class="font-medium">{{ getDirection(props.location.directionToLocation) }}</span>
        </div>
      </div>

      <!-- Speed Settings -->
      <div class="p-3 rounded bg-gray-50 dark:bg-gray-800/50">
        <div class="flex items-center gap-1 mb-2">
          <Gauge class="w-3 h-3 text-gray-600 dark:text-gray-400" />
          <span class="text-xs font-medium tracking-wide text-gray-700 uppercase dark:text-gray-300">Speed Settings</span>
        </div>
        <div class="grid grid-cols-3 gap-2 text-sm">
          <div class="text-center">
            <Home class="w-3 h-3 mx-auto mb-1 text-green-600 dark:text-green-400" />
            <div class="text-gray-600 dark:text-gray-400">
              Home
            </div>
            <div class="font-semibold text-green-700 dark:text-green-300">
              {{ props.location.speedGoToHome }}%
            </div>
          </div>
          <div class="text-center">
            <ChefHat class="w-3 h-3 mx-auto mb-1 text-purple-600 dark:text-purple-400" />
            <div class="text-gray-600 dark:text-gray-400">
              Kitchen
            </div>
            <div class="font-semibold text-purple-700 dark:text-purple-300">
              {{ props.location.speedGoToKitchen }}%
            </div>
          </div>
          <div class="text-center">
            <Truck class="w-3 h-3 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
            <div class="text-gray-600 dark:text-gray-400">
              Delivery
            </div>
            <div class="font-semibold text-blue-700 dark:text-blue-300">
              {{ props.location.speedDelivery }}%
            </div>
          </div>
        </div>
      </div>

      <!-- Timestamps -->
      <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Created: {{ formatDate(props.location.createdAt) }}</span>
        <span>Updated: {{ formatDate(props.location.updatedAt) }}</span>
      </div>
    </CardContent>

    <CardFooter class="flex justify-end gap-2 p-3 border-t ">
      <Button
        variant="outline"
        size="sm"
        @click="emit('edit', props.location)"
      >
        <Pencil class="w-3 h-3 mr-1" />
        Edit
      </Button>
      <Button
        variant="destructive"
        size="sm"
        @click="emit('delete', props.location)"
      >
        <Trash2 class="w-3 h-3 mr-1" />
        Delete
      </Button>
    </CardFooter>
  </Card>
</template>
