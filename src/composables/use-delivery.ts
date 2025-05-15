import { RaybotCommandAPI } from '@/api/raybot-command'
import { createRaybotHTTPClient } from '@/lib/http'
import { useDashboardLocalStorage } from './use-dashboard'

export function useDelivery() {
  const { homeLocation, kitchenLocation, robot } = useDashboardLocalStorage()

  const isValid = computed(() => homeLocation.value && kitchenLocation.value && robot.value)

  async function delivery(location: string) {
    if (!isValid.value) {
      return Promise.reject(new Error('Home, kitchen or robot not configured'))
    }

    const raybotCommandAPI = new RaybotCommandAPI(createRaybotHTTPClient(robot.value!.ipAddress))

    try {
      // Move to KITCHEN
      await raybotCommandAPI.createCommand({
        type: 'MOVE_TO',
        inputs: {
          location: kitchenLocation.value!.rfidTag,
          direction: 'FORWARD',
        },
      })

      // Lower cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_LOWER',
        inputs: {},
      })

      // Open cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_OPEN',
        inputs: {},
      })

      // Wait 10 seconds
      await raybotCommandAPI.createCommand({
        type: 'WAIT',
        inputs: {
          durationMs: 10000,
        },
      })

      // Close cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_CLOSE',
        inputs: {},
      })

      // Lift cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_LIFT',
        inputs: {},
      })

      // Move to target location
      await raybotCommandAPI.createCommand({
        type: 'MOVE_TO',
        inputs: {
          location,
          direction: 'FORWARD',
        },
      })

      // Lower cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_LOWER',
        inputs: {},
      })

      // Open cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_OPEN',
        inputs: {},
      })

      // Wait 10 seconds
      await raybotCommandAPI.createCommand({
        type: 'WAIT',
        inputs: {
          durationMs: 10000,
        },
      })

      // Close cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_CLOSE',
        inputs: {},
      })

      // Lift cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_LIFT',
        inputs: {},
      })

      // Move to HOME
      await raybotCommandAPI.createCommand({
        type: 'MOVE_TO',
        inputs: {
          location: homeLocation.value!.rfidTag,
          direction: 'FORWARD',
        },
      })
    }
    catch {
      return Promise.reject(new Error('Network error or may be robot is not connected'))
    }
  }

  return {
    delivery,
    isValid,
  }
}
