import type { Robot } from '@/types/robot'
import { generateId } from '@/lib/id'
import { useLocalStorage } from '@vueuse/core'

const STORAGE_KEY = 'robots'

export type CreateRobotParams = Omit<Robot, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateRobotParams = Partial<Omit<Robot, 'id' | 'createdAt' | 'updatedAt'>> & { id: string }

export function useRobotLocalStorage() {
  const state = useLocalStorage<Robot[]>(STORAGE_KEY, [])

  const robots = computed(() => state.value)

  function getRobotById(id: string): Robot | undefined {
    return state.value.find(robot => robot.id === id)
  }

  function createRobot(params: CreateRobotParams): Robot {
    const now = new Date().toISOString()

    const newRobot: Robot = {
      id: generateId(),
      ...params,
      createdAt: now,
      updatedAt: now,
    }

    state.value = [...state.value, newRobot]
    return newRobot
  }

  function updateRobot(params: UpdateRobotParams): Robot | undefined {
    const index = state.value.findIndex(robot => robot.id === params.id)

    if (index === -1) {
      return undefined
    }

    const updatedRobot: Robot = {
      ...state.value[index],
      ...params,
      updatedAt: new Date().toISOString(),
    }

    state.value = [
      ...state.value.slice(0, index),
      updatedRobot,
      ...state.value.slice(index + 1),
    ]

    return updatedRobot
  }

  function deleteRobot(id: string): boolean {
    const initialLength = state.value.length
    state.value = state.value.filter(robot => robot.id !== id)

    return state.value.length !== initialLength
  }

  function importRobots(robots: Robot[]) {
    state.value = robots
  }

  return {
    robots,
    getRobotById,
    createRobot,
    updateRobot,
    deleteRobot,
    importRobots,
  }
}
