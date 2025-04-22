<script setup lang="ts">
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRobotLocalStorage } from '@/composables/use-robot'
import RobotSelectItem from './RobotSelectItem.vue'

const { robots } = useRobotLocalStorage()
</script>

<template>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Select a robot" />
    </SelectTrigger>
    <SelectContent>
      <RobotSelectItem v-for="robot in robots" :key="robot.id" :robot="robot" />
    </SelectContent>
  </Select>
</template>
