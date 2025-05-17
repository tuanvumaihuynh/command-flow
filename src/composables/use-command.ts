import type { RaybotCommand } from '@/types/raybot-command'
import { RaybotCommandAPI } from '@/api/raybot-command'
import { createRaybotHTTPClient } from '@/lib/http'
import { ref } from 'vue'
import { useDashboardLocalStorage } from './use-dashboard'

export function useCommandProcessing(autoFetch = false) {
  const { robot } = useDashboardLocalStorage()
  const isLoading = ref(false)
  const commandProcessing = ref<RaybotCommand | null>(null)

  // Tạo API client
  const raybotCommandAPI = new RaybotCommandAPI(createRaybotHTTPClient(robot.value!.ipAddress))

  // Hàm fetch dữ liệu
  async function fetchCommandProcessing() {
    isLoading.value = true
    try {
      commandProcessing.value = await raybotCommandAPI.getCurrentProcessingCommand()
    }
    catch (error) {
      console.error('Error fetching command processing:', error)
    }
    finally {
      isLoading.value = false
    }
    return commandProcessing.value
  }

  // Chỉ gọi API lần đầu nếu autoFetch = true
  if (autoFetch) {
    fetchCommandProcessing()
  }

  return {
    commandProcessing,
    isLoading,
    refresh: fetchCommandProcessing,
  }
}
