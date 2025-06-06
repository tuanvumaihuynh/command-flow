<script setup lang="ts">
import PageContainer from '@/components/shared/PageContainer.vue'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useConfigCommand } from '@/composables/use-command-config'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const { config, updateConfigCommand } = useConfigCommand()

const schema = z.object({
  waitTime: z.number(),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    waitTime: config.value.waitTime,
  },
})

const onSubmit = handleSubmit((values) => {
  updateConfigCommand({ waitTime: values.waitTime })
  notification.success('Configuration updated')
})
</script>

<template>
  <PageContainer>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">
        Commands configuration
      </h1>
    </div>
    <form class="w-full max-w-lg space-y-6" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="waitTime">
        <FormItem>
          <FormLabel>
            Wait Time (ms)
          </FormLabel>
          <FormControl>
            <Input type="number" v-bind="componentField" placeholder="Time to wait of WAIT command" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="flex justify-end gap-2">
        <Button type="submit">
          Submit
        </Button>
      </div>
    </form>
  </PageContainer>
</template>
