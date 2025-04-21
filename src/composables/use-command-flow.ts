import type { CommandFlow } from '@/types/command-flow'
import { generateId } from '@/lib/id'
import { useLocalStorage } from '@vueuse/core'

const STORAGE_KEY = 'command-flows'

export type CreateCommandFlowParams = Omit<CommandFlow, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateCommandFlowParams = Partial<Omit<CommandFlow, 'id' | 'createdAt' | 'updatedAt'>> & { id: string }

export function useCommandFlowLocalStorage() {
  const state = useLocalStorage<CommandFlow[]>(STORAGE_KEY, [])

  const commandFlows = computed(() => state.value)

  function getCommandFlowById(id: string): CommandFlow | undefined {
    return state.value.find(commandFlow => commandFlow.id === id)
  }

  function createCommandFlow(params: CreateCommandFlowParams): CommandFlow {
    const now = new Date().toISOString()

    const newCommandFlow: CommandFlow = {
      id: generateId(),
      ...params,
      createdAt: now,
      updatedAt: now,
    }

    state.value = [...state.value, newCommandFlow]

    return newCommandFlow
  }

  function updateCommandFlow(params: UpdateCommandFlowParams): CommandFlow | undefined {
    const index = state.value.findIndex(commandFlow => commandFlow.id === params.id)
    if (index === -1)
      return undefined

    const now = new Date().toISOString()

    const updatedCommandFlow: CommandFlow = {
      ...state.value[index],
      ...params,
      updatedAt: now,
    }

    state.value = [
      ...state.value.slice(0, index),
      updatedCommandFlow,
      ...state.value.slice(index + 1),
    ]

    return updatedCommandFlow
  }

  function deleteCommandFlow(id: string): boolean {
    const initialLength = state.value.length
    state.value = state.value.filter(commandFlow => commandFlow.id !== id)

    return state.value.length !== initialLength
  }

  function importCommandFlows(commandFlows: CommandFlow[]): void {
    state.value = commandFlows
  }

  return {
    commandFlows,
    getCommandFlowById,
    createCommandFlow,
    updateCommandFlow,
    deleteCommandFlow,
    importCommandFlows,
  }
}
