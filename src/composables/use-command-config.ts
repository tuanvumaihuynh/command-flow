import type { CommandConfig } from '@/types/command-config'
import { useLocalStorage } from '@vueuse/core'

const STORAGE_KEY = 'config-command'

export function useConfigCommand() {
  const state = useLocalStorage<CommandConfig>(STORAGE_KEY, {
    waitTime: 40000,
  })

  const config = computed(() => state.value)

  function updateConfigCommand(config: CommandConfig) {
    state.value = config
  }

  function importConfigCommand(config: CommandConfig) {
    state.value = config
  }

  return {
    config,
    updateConfigCommand,
    importConfigCommand,
  }
}
