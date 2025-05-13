import type { DashboardConfig } from '@/types/dashboard'
import { useLocalStorage } from '@vueuse/core'
import { useLocationLocalStorage } from './use-location'
import { useRobotLocalStorage } from './use-robot'

const STORAGE_KEY = 'dashboard'

export function useDashboardLocalStorage() {
  const state = useLocalStorage<DashboardConfig>(STORAGE_KEY, {
    homeLocationId: '',
    kitchenLocationId: '',
    robotId: '',
  })
  const { getLocationById } = useLocationLocalStorage()
  const { getRobotById } = useRobotLocalStorage()

  const config = computed(() => state.value)
  const homeLocation = computed(() => getLocationById(config.value.homeLocationId))
  const kitchenLocation = computed(() => getLocationById(config.value.kitchenLocationId))
  const robot = computed(() => getRobotById(config.value.robotId))

  function updateConfig(config: DashboardConfig) {
    state.value = config
  }
  function importConfig(config: DashboardConfig) {
    state.value = config
  }

  return {
    config,
    homeLocation,
    kitchenLocation,
    robot,
    updateConfig,
    importConfig,
  }
}
