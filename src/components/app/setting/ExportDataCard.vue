<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useCommandConfigLocalStorage } from '@/composables/use-command-config'
import { useDashboardLocalStorage } from '@/composables/use-dashboard'
import { useLocationLocalStorage } from '@/composables/use-location'
import { useRobotLocalStorage } from '@/composables/use-robot'
import { Download } from 'lucide-vue-next'

const { locations } = useLocationLocalStorage()
const { config } = useDashboardLocalStorage()
const { robots } = useRobotLocalStorage()
const { commandConfig } = useCommandConfigLocalStorage()
function handleExportData() {
  try {
    const exportData = {
      locations: locations.value,
      dashboard: config.value,
      robots: robots.value,
      commandConfig: commandConfig.value,
      exportDate: new Date().toISOString(),
    }

    const jsonString = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `command-flow-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()

    URL.revokeObjectURL(url)
    document.body.removeChild(a)

    notification.success({
      title: 'Data exported successfully',
      message: 'Your data has been exported to a JSON file.',
    })
  }
  catch (error) {
    console.error('Export error:', error)
    notification.error({
      title: 'Export failed',
      message: 'There was an error exporting your data.',
    })
  }
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Export Data</CardTitle>
      <CardDescription>
        Export all your data to a JSON file for backup.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p class="mb-4">
        This will export all your data stored in this browser. You can use this file to restore your data later or
        transfer it to another device.
      </p>
      <div class="flex items-center space-x-2">
        <div class="text-sm text-muted-foreground">
          <span class="font-medium">
            Current data: {{ locations.length }} locations, {{ robots.length }} robots.
          </span>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button @click="handleExportData">
        <Download class="w-4 h-4 mr-2" /> Export Data
      </Button>
    </CardFooter>
  </Card>
</template>
