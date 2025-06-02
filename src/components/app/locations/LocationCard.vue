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
  <Card class="overflow-hidden transition-shadow duration-200 hover:shadow-md">
    <CardHeader class="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <MapPin class="w-4 h-4 text-blue-600" />
          <CardTitle class="text-base font-semibold text-gray-900">
            {{ props.location.name }}
          </CardTitle>
        </div>
        <Badge variant="secondary" class="text-xs text-blue-700 bg-blue-100">
          <Tag class="w-3 h-3 mr-1" />
          {{ props.location.rfidTag }}
        </Badge>
      </div>
    </CardHeader>

    <CardContent class="p-4 space-y-3">
      <!-- Position & Direction -->
      <div class="grid grid-cols-2 gap-3">
        <div class="p-2 rounded bg-orange-50">
          <div class="flex items-center gap-1 mb-1">
            <ArrowDown class="w-3 h-3 text-orange-600" />
            <span class="text-sm font-medium text-orange-700">Lower position</span>
          </div>
          <span class="text-base font-semibold text-orange-800">{{ props.location.lowerPosition }} cm</span>
        </div>
        <div class="p-2 rounded bg-indigo-50">
          <div class="flex items-center gap-1 mb-1">
            <Navigation class="w-3 h-3 text-indigo-600" />
            <span class="text-sm font-medium text-indigo-700">Direction to home</span>
          </div>
          <span class="text-base font-semibold text-indigo-800">{{ props.location.directionToHome }}</span>
        </div>
      </div>

      <!-- Speed Settings -->
      <div class="p-3 rounded bg-gray-50">
        <div class="flex items-center gap-1 mb-2">
          <Gauge class="w-3 h-3 text-gray-600" />
          <span class="text-xs font-medium tracking-wide text-gray-700 uppercase">Speed Settings</span>
        </div>
        <div class="grid grid-cols-3 gap-2 text-sm">
          <div class="text-center">
            <Home class="w-3 h-3 mx-auto mb-1 text-green-600" />
            <div class="text-gray-600">
              Home
            </div>
            <div class="font-semibold text-green-700">
              {{ props.location.speedGoToHome }}%
            </div>
          </div>
          <div class="text-center">
            <ChefHat class="w-3 h-3 mx-auto mb-1 text-purple-600" />
            <div class="text-gray-600">
              Kitchen
            </div>
            <div class="font-semibold text-purple-700">
              {{ props.location.speedGoToKitchen }}%
            </div>
          </div>
          <div class="text-center">
            <Truck class="w-3 h-3 mx-auto mb-1 text-blue-600" />
            <div class="text-gray-600">
              Delivery
            </div>
            <div class="font-semibold text-blue-700">
              {{ props.location.speedDelivery }}%
            </div>
          </div>
        </div>
      </div>

      <!-- Timestamps -->
      <div class="flex justify-between text-xs text-gray-500">
        <span>Created: {{ formatDate(props.location.createdAt) }}</span>
        <span>Updated: {{ formatDate(props.location.updatedAt) }}</span>
      </div>
    </CardContent>

    <CardFooter class="flex justify-end gap-2 p-3 border-t bg-gray-50">
      <Button
        variant="outline"
        size="sm"
        class="h-8 px-3 text-xs transition-colors hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
        @click="emit('edit', props.location)"
      >
        <Pencil class="w-3 h-3 mr-1" />
        Edit
      </Button>
      <Button
        variant="destructive"
        size="sm"
        class="h-8 px-3 text-xs transition-colors hover:bg-red-50 hover:text-red-600 hover:border-red-200"
        @click="emit('delete', props.location)"
      >
        <Trash2 class="w-3 h-3 mr-1" />
        Delete
      </Button>
    </CardFooter>
  </Card>
</template>
