import type { Location } from '@/types/location'
import { RaybotCommandAPI } from '@/api/raybot-command'
import { createRaybotHTTPClient } from '@/lib/http'
import { useDashboardLocalStorage } from './use-dashboard'

export function useDelivery() {
  const { homeLocation, kitchenLocation, robot } = useDashboardLocalStorage()

  const isValid = computed(() => homeLocation.value && kitchenLocation.value && robot.value)

  async function delivery(location: Location) {
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
          motorSpeed: location.speedGoToKitchen,
        },
      })

      // Lower cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_LOWER',
        inputs: {
          motorSpeed: 100,
          position: kitchenLocation.value!.lowerPosition,
          bottomObstacleTracking: {
            enterDistance: 15,
            exitDistance: 25,
          },
        },
      })

      // Open cargo
      // await raybotCommandAPI.createCommand({
      //   type: 'CARGO_OPEN',
      //   inputs: {
      //     motorSpeed: 80,
      //   },
      // })

      // Wait 30 seconds
      await raybotCommandAPI.createCommand({
        type: 'WAIT',
        inputs: {
          durationMs: 30000,
        },
      })

      // Close cargo
      // await raybotCommandAPI.createCommand({
      //   type: 'CARGO_CLOSE',
      //   inputs: {
      //     motorSpeed: 50,
      //   },
      // })

      // Lift cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_LIFT',
        inputs: {
          motorSpeed: 100,
          position: 30,
        },
      })

      // Move to target location
      await raybotCommandAPI.createCommand({
        type: 'MOVE_TO',
        inputs: {
          location: location.rfidTag,
          direction: 'FORWARD',
          motorSpeed: location.speedDelivery,
        },
      })

      // Lower cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_LOWER',
        inputs: {
          motorSpeed: 100,
          position: location.lowerPosition,
          bottomObstacleTracking: {
            enterDistance: 15,
            exitDistance: 25,
          },
        },
      })

      // Open cargo
      // await raybotCommandAPI.createCommand({
      //   type: 'CARGO_OPEN',
      //   inputs: {
      //     motorSpeed: 80,
      //   },
      // })

      // Wait 30 seconds
      await raybotCommandAPI.createCommand({
        type: 'WAIT',
        inputs: {
          durationMs: 30000,
        },
      })

      // Close cargo
      // await raybotCommandAPI.createCommand({
      //   type: 'CARGO_CLOSE',
      //   inputs: {
      //     motorSpeed: 50,
      //   },
      // })

      // Lift cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_LIFT',
        inputs: {
          motorSpeed: 100,
          position: 30,
        },
      })

      // Move to HOME
      await raybotCommandAPI.createCommand({
        type: 'MOVE_TO',
        inputs: {
          location: homeLocation.value!.rfidTag,
          direction: location.directionToHome,
          motorSpeed: location.speedGoToHome,
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
