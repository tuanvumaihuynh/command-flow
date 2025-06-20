<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useDashboardLocalStorage } from '@/composables/use-dashboard'
import { useLocationLocalStorage } from '@/composables/use-location'
import { useRobotLocalStorage } from '@/composables/use-robot'

const props = defineProps<{
  to: HTMLElement
}>()

const isOpen = defineModel<boolean>('open', { required: true })

const { locations } = useLocationLocalStorage()
const { robots } = useRobotLocalStorage()
const { config, updateConfig, homeLocation, kitchenLocation, robot } = useDashboardLocalStorage()
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent :to="props.to" class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Config</DialogTitle>
        <DialogDescription>
          Configure home, kitchen location and target robot
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-2">
        <Label>Home Location</Label>
        <Select
          :model-value="config.homeLocationId" @update:model-value="(e) => {
            updateConfig({ ...config, homeLocationId: e as string })
          }"
        >
          <SelectTrigger>
            <SelectValue :value="homeLocation?.name" placeholder="Select home location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="location in locations"
                :key="location.id"
                :value="location.id"
              >
                {{ location.name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="space-y-2">
        <Label>Kitchen Location</Label>
        <Select
          :model-value="config.kitchenLocationId" @update:model-value="(e) => {
            updateConfig({ ...config, kitchenLocationId: e as string })
          }"
        >
          <SelectTrigger>
            <SelectValue :value="kitchenLocation?.name" placeholder="Select kitchen location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="location in locations" :key="location.id" :value="location.id">
                {{ location.name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="space-y-2">
        <Label>Direction to Kitchen</Label>
        <Select
          :model-value="config.directionToKitchen" @update:model-value="(e) => {
            updateConfig({ ...config, directionToKitchen: e as 'FORWARD' | 'BACKWARD' })
          }"
        >
          <SelectTrigger>
            <SelectValue :value="kitchenLocation?.name" placeholder="Select kitchen location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="FORWARD">
                Forward
              </SelectItem>
              <SelectItem value="BACKWARD">
                Backward
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="space-y-2">
        <Label>Target Robot</Label>
        <Select
          :model-value="config.robotId" @update:model-value="(e) => {
            updateConfig({ ...config, robotId: e as string })
          }"
        >
          <SelectTrigger>
            <SelectValue :value="robot?.name" placeholder="Select robot" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="r in robots" :key="r.id" :value="r.id">
                {{ r.name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div class="space-y-2">
        <Label>Cargo Wait Time (ms)</Label>
        <Input
          type="number"
          :model-value="config.cargoWaitTime" @update:model-value="(e) => {
            updateConfig({ ...config, cargoWaitTime: e as number })
          }"
        />
      </div>

      <div class="space-y-2">
        <Label>Cargo Lift Position (cm)</Label>
        <Input
          type="number"
          :model-value="config.cargoLiftPosition" @update:model-value="(e) => {
            updateConfig({ ...config, cargoLiftPosition: e as number })
          }"
        />
      </div>
    </DialogContent>
  </Dialog>
</template>
