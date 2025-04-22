<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useLocationLocalStorage } from '@/composables/use-location'
import { useSettingLocalStorage } from '@/composables/use-setting'
import { AlertTriangle, Save, Upload } from 'lucide-vue-next'
import { fromZodError } from 'zod-validation-error'
import { importDataSchema } from './schemas'

const fileInputRef = useTemplateRef('fileInputRef')

const importData = ref('')
const importError = ref('')
const validationDetails = ref<{ message: string, path: string[] }[]>([])

const { importLocations } = useLocationLocalStorage()
const { importSetting } = useSettingLocalStorage()

function handleImportClick() {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file)
    return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string
      importData.value = content
      importError.value = ''
      validationDetails.value = []
    }
    catch (error) {
      console.error('File reading error:', error)
      importError.value = 'Could not read the file. Please try again.'
      validationDetails.value = []
    }
  }
  reader.readAsText(file)
}

function handleImportData() {
  try {
    if (!importData.value) {
      importError.value = 'No data to import. Please select a file first.'
      validationDetails.value = []
      return
    }

    const jsonData = JSON.parse(importData.value)

    // Validate data using zod schema
    const result = importDataSchema.safeParse(jsonData)

    if (!result.success) {
      const validationError = fromZodError(result.error)
      importError.value = 'Invalid data format. The file contains incorrect data structure.'
      validationDetails.value = validationError.details.map(detail => ({
        message: detail.message,
        path: detail.path.map(String),
      }))
      return
    }

    const data = result.data

    importLocations(data.locations)
    importSetting(data.setting)

    notification.success({
      title: 'Data imported successfully',
      message: `Imported ${data.locations.length} locations.`,
    })

    // Clear import data and error
    importData.value = ''
    importError.value = ''
    validationDetails.value = []
    // Reset file input
    if (fileInputRef.value) {
      fileInputRef.value.value = ''
    }

    // Refresh the page to apply imported data
    window.location.reload()
  }
  catch (error) {
    console.error('Import error:', error)
    importError.value = 'Failed to import data. The file may be corrupted or in an invalid format.'
    validationDetails.value = []
  }
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Import Data</CardTitle>
      <CardDescription>Import data from a previously exported JSON file to restore your system.</CardDescription>
    </CardHeader>
    <CardContent>
      <p class="mb-4">
        This will replace all your current data with the data from the imported file. Make sure to export your
        current data first if you want to keep it.
      </p>

      <Alert v-if="importError" variant="destructive" class="mb-4">
        <AlertTriangle class="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{{ importError }}</AlertDescription>
        <ul v-if="validationDetails.length > 0" class="mt-2 list-disc list-inside">
          <li v-for="detail in validationDetails" :key="detail.message">
            {{ detail.path }} - {{ detail.message }}
          </li>
        </ul>
      </Alert>

      <input ref="fileInputRef" type="file" accept=".json" class="hidden" @change="handleFileChange">
    </CardContent>
    <CardFooter class="flex justify-between">
      <Button variant="outline" @click="handleImportClick">
        <Upload class="w-4 h-4 mr-2" /> Select File
      </Button>
      <Button :disabled="!importData" @click="handleImportData">
        <Save class="w-4 h-4 mr-2" /> Import Data
      </Button>
    </CardFooter>
  </Card>
</template>
