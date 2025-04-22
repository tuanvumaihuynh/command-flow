import { RaybotCommandAPI } from '@/api/raybot-command'
import { createRaybotHTTPClient } from '@/lib/http'
import { useSettingLocalStorage } from './use-setting'

const HOME_LOCATION = '0744778982'
const KITCHEN_LOCATION = '0744285926'

export function useDelivery() {
  const { setting } = useSettingLocalStorage()

  const raybotCommandAPI = new RaybotCommandAPI(createRaybotHTTPClient(setting.value.robotAPIURL))

  async function delivery(location: string) {
    // Move to KITCHEN
    await raybotCommandAPI.createCommand({
      type: 'MOVE_TO',
      inputs: {
        location: KITCHEN_LOCATION,
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
        location: HOME_LOCATION,
      },
    })
  }

  return {
    delivery,
  }
}
