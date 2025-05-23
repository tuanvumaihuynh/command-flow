<script setup lang="ts">
import { commandConfigSchema } from '@/components/app/setting/schemas'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCommandConfigLocalStorage } from '@/composables/use-command-config'
import { toTypedSchema } from '@vee-validate/zod'
import { MapPin, MoveDown, MoveUp, Package } from 'lucide-vue-next'
import { useForm } from 'vee-validate'

const { commandConfig, updateCommandConfig } = useCommandConfigLocalStorage()

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(commandConfigSchema),
  initialValues: commandConfig.value,
})

const onSubmit = handleSubmit((values) => {
  updateCommandConfig(values)
  notification.success('Command config updated')
})
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
    <div class="gap-4 space-y-4 columns-1 md:columns-2">
      <!-- MOVE TO Section -->
      <Card class="!shadow-none">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <MapPin class="w-4 h-4" /> Movement Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField v-slot="{ componentField }" :name="'MOVE_TO.motorSpeed'">
            <FormItem>
              <FormLabel>Motor Speed (%)</FormLabel>
              <FormControl>
                <Input type="number" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </CardContent>
      </Card>

      <!-- CARGO LOWER Section -->
      <Card class="!shadow-none">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <MoveDown class="w-4 h-4" /> Cargo Lower Configuration
          </CardTitle>
          <CardDescription>
            Configure the motor speed, position and obstacle tracking for cargo lowering
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <FormField v-slot="{ componentField }" :name="'CARGO_LOWER.motorSpeed'">
            <FormItem>
              <FormLabel>Motor Speed (%)</FormLabel>
              <FormControl>
                <Input type="number" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" :name="'CARGO_LOWER.position'">
            <FormItem>
              <FormLabel>Target Position</FormLabel>
              <FormControl>
                <Input type="number" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <div class="mt-4 space-y-4">
            <span class="text-sm font-medium ">
              Bottom Obstacle Tracking
            </span>
            <div class="grid grid-cols-2 gap-4">
              <FormField v-slot="{ componentField }" :name="'CARGO_LOWER.bottomObstacleTracking.enterDistance'">
                <FormItem>
                  <FormLabel>Enter Distance</FormLabel>
                  <FormControl>
                    <Input type="number" :min="0" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" :name="'CARGO_LOWER.bottomObstacleTracking.exitDistance'">
                <FormItem>
                  <FormLabel>Exit Distance</FormLabel>
                  <FormControl>
                    <Input type="number" :min="0" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- CARGO OPEN Section -->
      <Card class="!shadow-none">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Package class="w-4 h-4" /> Cargo Door Operations
          </CardTitle>
          <CardDescription>
            Configure the motor speed for the cargo door operations
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <FormField v-slot="{ componentField }" :name="'CARGO_OPEN.motorSpeed'">
            <FormItem>
              <FormLabel>Cargo Open - Motor Speed (%)</FormLabel>
              <FormControl>
                <Input type="number" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" :name="'CARGO_CLOSE.motorSpeed'">
            <FormItem>
              <FormLabel>Cargo Close - Motor Speed (%)</FormLabel>
              <FormControl>
                <Input type="number" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </CardContent>
      </Card>

      <!-- CARGO LIFT Section -->
      <Card class="!shadow-none">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <MoveUp class="w-4 h-4" /> Cargo Lift Configuration
          </CardTitle>
          <CardDescription>
            Configure the motor speed and position settings for cargo lifting
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <FormField v-slot="{ componentField }" :name="'CARGO_LIFT.motorSpeed'">
            <FormItem>
              <FormLabel>Motor Speed (%)</FormLabel>
              <FormControl>
                <Input type="number" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" :name="'CARGO_LIFT.position'">
            <FormItem>
              <FormLabel>Target Position</FormLabel>
              <FormControl>
                <Input type="number" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </CardContent>
      </Card>
    </div>

    <div class="flex justify-end gap-2">
      <Button type="submit">
        Save
      </Button>
      <Button type="button" variant="outline" @click="resetForm">
        Reset
      </Button>
    </div>
  </form>
</template>
