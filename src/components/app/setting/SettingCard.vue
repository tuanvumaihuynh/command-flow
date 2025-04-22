<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useSettingLocalStorage } from '@/composables/use-setting'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { settingSchema } from './schemas'

const { setting } = useSettingLocalStorage()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(settingSchema),
  initialValues: {
    robotAPIURL: '',
  },
})

const onSubmit = handleSubmit((values) => {
  setting.value = values
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>
        Setting
      </CardTitle>
      <CardDescription>
        Configure the settings for the application
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit">
        <div class="grid gap-4 pb-4">
          <FormField v-slot="{ componentField }" name="robotAPIURL" class="grid gap-2">
            <FormItem>
              <FormLabel>
                Robot API URL
              </FormLabel>
              <FormControl>
                <FormInput v-bind="componentField" type="text" placeholder="Enter robot API URL" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </form>

      <Button type="submit">
        Save
      </Button>
    </cardcontent>
  </Card>
</template>
