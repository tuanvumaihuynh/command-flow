import { RaybotCommandAPI } from '@/api/raybot-command'
import { createRaybotHTTPClient } from '@/lib/http'
import { useDashboardLocalStorage } from './use-dashboard'
import { useLocationLocalStorage } from './use-location'
import { useSettingLocalStorage } from './use-setting'

export function useDelivery() {
  const { setting } = useSettingLocalStorage()
  const { dashboard } = useDashboardLocalStorage()
  const { locations } = useLocationLocalStorage()

  // Get locations
  const HomeLocation = computed(() => locations.value.find(location => location.id === dashboard.value.homeLocation))
  const KitchenLocation = computed(() => locations.value.find(location => location.id === dashboard.value.kitchenLocation))

  // Create raybot command API
  const raybotCommandAPI = new RaybotCommandAPI(createRaybotHTTPClient(setting.value.robotAPIURL))

  async function delivery(location: string) {
    // Move to KITCHEN
    await raybotCommandAPI.createCommand({
      type: 'MOVE_TO',
      inputs: {
        location: KitchenLocation.value!.rfidTag,
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
        location: HomeLocation.value!.rfidTag,
      },
    })
  }

  return {
    delivery,
    HomeLocation,
    KitchenLocation,
  }
}
