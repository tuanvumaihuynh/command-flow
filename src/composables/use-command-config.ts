import type { CommandConfig } from '@/types/command-config'
import { useLocalStorage } from '@vueuse/core'

const STORAGE_KEY = 'command-config'

export type CreateCommandConfigParams = CommandConfig
export type UpdateCommandConfigParams = CommandConfig
const DEFAULT_COMMAND_CONFIG: CommandConfig = {
  MOVE_TO: {
    motorSpeed: 80,
  },
  CARGO_OPEN: {
    motorSpeed: 80,
  },
  CARGO_CLOSE: {
    motorSpeed: 80,
  },
  CARGO_LIFT: {
    motorSpeed: 80,
    position: 10,
  },
  CARGO_LOWER: {
    motorSpeed: 80,
    position: 200,
    bottomObstacleTracking: {
      enterDistance: 10,
      exitDistance: 10,
    },
  },
}
export function useCommandConfigLocalStorage() {
  const state = useLocalStorage<CommandConfig>(STORAGE_KEY, DEFAULT_COMMAND_CONFIG)

  const commandConfig = computed(() => state.value)

  function getCommandConfigByType<T extends keyof CommandConfig>(type: T): CommandConfig[T] {
    return state.value[type] as CommandConfig[T]
  }

  function createCommandConfig(params: CreateCommandConfigParams): void {
    state.value = params
  }

  return {
    commandConfig,
    getCommandConfigByType,
    createCommandConfig,
    importCommandConfig: createCommandConfig,
    updateCommandConfig: createCommandConfig,
  }
}
