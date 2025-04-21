import type { Location } from '@/types/location'
import { generateId } from '@/lib/id'
import { useLocalStorage } from '@vueuse/core'

const STORAGE_KEY = 'locations'

export type CreateLocationParams = Omit<Location, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateLocationParams = Partial<Omit<Location, 'id' | 'createdAt' | 'updatedAt'>> & { id: string }

export function useLocationLocalStorage() {
  const state = useLocalStorage<Location[]>(STORAGE_KEY, [])

  const locations = computed(() => state.value)

  function getLocationById(id: string): Location | undefined {
    return state.value.find(location => location.id === id)
  }

  function createLocation(params: CreateLocationParams): Location {
    const now = new Date().toISOString()

    const newLocation: Location = {
      id: generateId(),
      ...params,
      createdAt: now,
      updatedAt: now,
    }

    state.value = [...state.value, newLocation]
    return newLocation
  }

  function updateLocation(params: UpdateLocationParams): Location | undefined {
    const index = state.value.findIndex(location => location.id === params.id)

    if (index === -1) {
      return undefined
    }

    const updatedLocation: Location = {
      ...state.value[index],
      ...params,
      updatedAt: new Date().toISOString(),
    }

    state.value = [
      ...state.value.slice(0, index),
      updatedLocation,
      ...state.value.slice(index + 1),
    ]

    return updatedLocation
  }

  function deleteLocation(id: string): boolean {
    const initialLength = state.value.length
    state.value = state.value.filter(location => location.id !== id)

    return state.value.length !== initialLength
  }

  function importLocations(locations: Location[]) {
    state.value = locations
  }

  return {
    locations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
    importLocations,
  }
}
