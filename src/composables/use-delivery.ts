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
          motorSpeed: 70,
        },
      })

      await new Promise(resolve => setTimeout(resolve, 1000))

      // Lower cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_LOWER',
        inputs: {
          motorSpeed: 100,
          position: 240,
          bottomObstacleTracking: {
            enterDistance: 15,
            exitDistance: 25,
          },
        },
      })

      await new Promise(resolve => setTimeout(resolve, 1000))

      // Open cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_OPEN',
        inputs: {
          motorSpeed: 80,
        },
      })

      await new Promise(resolve => setTimeout(resolve, 1000))

      // Wait 30 seconds
      await raybotCommandAPI.createCommand({
        type: 'WAIT',
        inputs: {
          durationMs: 30000,
        },
      })

      await new Promise(resolve => setTimeout(resolve, 1000))

      // Close cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_CLOSE',
        inputs: {
          motorSpeed: 50,
        },
      })

      // Lift cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_LIFT',
        inputs: {
          motorSpeed: 100,
          position: 25,
        },
      })

      await new Promise(resolve => setTimeout(resolve, 1000))

      // Move to target location
      await raybotCommandAPI.createCommand({
        type: 'MOVE_TO',
        inputs: {
          location,
          direction: 'FORWARD',
          motorSpeed: 100,
        },
      })
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Lower cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_LOWER',
        inputs: {
          motorSpeed: 100,
          position: 240,
          bottomObstacleTracking: {
            enterDistance: 15,
            exitDistance: 25,
          },
        },
      })

      await new Promise(resolve => setTimeout(resolve, 1000))

      // Open cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_OPEN',
        inputs: {
          motorSpeed: 80,
        },
      })

      await new Promise(resolve => setTimeout(resolve, 1000))

      // Wait 30 seconds
      await raybotCommandAPI.createCommand({
        type: 'WAIT',
        inputs: {
          durationMs: 30000,
        },
      })

      await new Promise(resolve => setTimeout(resolve, 1000))

      // Close cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_CLOSE',
        inputs: {
          motorSpeed: 50,
        },
      })

      // Lift cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_LIFT',
        inputs: {
          motorSpeed: 100,
          position: 25,
        },
      })

      await new Promise(resolve => setTimeout(resolve, 1000))

      // Move to HOME
      await raybotCommandAPI.createCommand({
        type: 'MOVE_TO',
        inputs: {
          location: homeLocation.value!.rfidTag,
          direction: 'BACKWARD',
          motorSpeed: 100,
        },
      })
    }
    catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    delivery,
    isValid,
  }
}
