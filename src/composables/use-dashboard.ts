import type { Dashboard } from '@/types/dashboard'
import { useLocalStorage } from '@vueuse/core'

const STORAGE_KEY = 'dashboard'

export function useDashboardLocalStorage() {
  const dashboard = useLocalStorage<Dashboard>(STORAGE_KEY, {
    homeLocation: '',
    kitchenLocation: '',
  })

  function importDashboard(d: Dashboard) {
    dashboard.value = d
  }

  return {
    dashboard,
    importDashboard,
  }
}
