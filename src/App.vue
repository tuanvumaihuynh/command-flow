<script setup lang="ts">
import { Notification, Notivue } from 'notivue'
</script>

<template>
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
  <RouterView />
</template>
