import { RaybotCommandAPI } from '@/api/raybot-command'
import { createRaybotHTTPClient } from '@/lib/http'
import { useCommandConfigLocalStorage } from './use-command-config'
import { useDashboardLocalStorage } from './use-dashboard'

export function useDelivery() {
  const { homeLocation, kitchenLocation, robot } = useDashboardLocalStorage()
  const { commandConfig, getCommandConfigByType } = useCommandConfigLocalStorage()

  const isValid = computed(() => homeLocation.value && kitchenLocation.value && robot.value && Object.keys(commandConfig.value).length !== 0)

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
          ...getCommandConfigByType('MOVE_TO'),
        },
      })

      // sleep 1 second
      await new Promise(resolve => setTimeout(resolve, 500))

      // Lower cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_LOWER',
        inputs: {
          ...getCommandConfigByType('CARGO_LOWER'),
        },
      })

      // sleep 1 second
      await new Promise(resolve => setTimeout(resolve, 500))

      // sleep 1 second
      await new Promise(resolve => setTimeout(resolve, 500))

      // Wait 10 seconds
      await raybotCommandAPI.createCommand({
        type: 'WAIT',
        inputs: {
          durationMs: 30000,
        },
      })

      // sleep 1 second
      await new Promise(resolve => setTimeout(resolve, 500))

      // sleep 1 second
      await new Promise(resolve => setTimeout(resolve, 500))

      // Lift cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_LIFT',
        inputs: {
          ...getCommandConfigByType('CARGO_LIFT'),
        },
      })

      // sleep 1 second
      await new Promise(resolve => setTimeout(resolve, 500))

      // Move to target location
      await raybotCommandAPI.createCommand({
        type: 'MOVE_TO',
        inputs: {
          location,
          direction: 'FORWARD',
          ...getCommandConfigByType('MOVE_TO'),
        },
      })

      // sleep 1 second
      await new Promise(resolve => setTimeout(resolve, 500))

      // Lower cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_LOWER',
        inputs: {
          ...getCommandConfigByType('CARGO_LOWER'),
        },
      })

      // sleep 1 second
      await new Promise(resolve => setTimeout(resolve, 500))

      // sleep 1 second
      await new Promise(resolve => setTimeout(resolve, 500))

      // Wait 10 seconds
      await raybotCommandAPI.createCommand({
        type: 'WAIT',
        inputs: {
          durationMs: 30000,
        },
      })

      // sleep 1 second
      await new Promise(resolve => setTimeout(resolve, 500))

      // sleep 1 second
      await new Promise(resolve => setTimeout(resolve, 500))

      // Lift cargo
      await raybotCommandAPI.createCommand({
        type: 'CARGO_LIFT',
        inputs: {
          ...getCommandConfigByType('CARGO_LIFT'),
        },
      })

      // sleep 1 second
      await new Promise(resolve => setTimeout(resolve, 500))

      // Move to HOME
      await raybotCommandAPI.createCommand({
        type: 'MOVE_TO',
        inputs: {
          location: homeLocation.value!.rfidTag,
          direction: 'FORWARD',
          ...getCommandConfigByType('MOVE_TO'),
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
