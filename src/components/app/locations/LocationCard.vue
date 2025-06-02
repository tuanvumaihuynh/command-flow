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
</script>

<template>
  <Card class="overflow-hidden transition-shadow duration-200 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-gray-900/20">
    <CardHeader class="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
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
      <div class="grid grid-cols-2 gap-3">
        <div class="p-2 rounded bg-orange-50 dark:bg-orange-950/30">
          <div class="flex items-center gap-1 mb-1">
            <ArrowDown class="w-3 h-3 text-orange-600 dark:text-orange-400" />
            <span class="text-sm font-medium text-orange-700 dark:text-orange-300">Lower position</span>
          </div>
          <span class="text-base font-semibold text-orange-800 dark:text-orange-200">{{ props.location.lowerPosition }} cm</span>
        </div>
        <div class="p-2 rounded bg-indigo-50 dark:bg-indigo-950/30">
          <div class="flex items-center gap-1 mb-1">
            <Navigation class="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
            <span class="text-sm font-medium text-indigo-700 dark:text-indigo-300">Direction to home</span>
          </div>
          <span class="text-base font-semibold text-indigo-800 dark:text-indigo-200">{{ props.location.directionToHome }}</span>
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

    <CardFooter class="flex justify-end gap-2 p-3 border-t bg-gray-50 dark:bg-gray-800/30 dark:border-gray-700">
      <Button
        variant="outline"
        size="sm"
        class="h-8 px-3 text-xs transition-colors hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 dark:hover:border-blue-700"
        @click="emit('edit', props.location)"
      >
        <Pencil class="w-3 h-3 mr-1" />
        Edit
      </Button>
      <Button
        variant="destructive"
        size="sm"
        class="h-8 px-3 text-xs transition-colors hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950/50 dark:hover:text-red-400 dark:hover:border-red-700"
        @click="emit('delete', props.location)"
      >
        <Trash2 class="w-3 h-3 mr-1" />
        Delete
      </Button>
    </CardFooter>
  </Card>
</template>
