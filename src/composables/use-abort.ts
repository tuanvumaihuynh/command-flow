import { EmergencyAPI } from '@/api/emergency'
import { RaybotCommandAPI } from '@/api/raybot-command'
import { createRaybotHTTPClient } from '@/lib/http'
import { useDashboardLocalStorage } from './use-dashboard'

export function useAbort() {
  const { homeLocation, kitchenLocation, robot } = useDashboardLocalStorage()
  const loading = ref(false)

  const isValid = computed(() => homeLocation.value && kitchenLocation.value && robot.value)
  async function abort() {
    if (!isValid.value) {
      return Promise.reject(new Error('Home, kitchen or robot not configured'))
    }
    loading.value = true
    const raybotCommandAPI = new RaybotCommandAPI(createRaybotHTTPClient(robot.value!.ipAddress))
    const emergencyAPI = new EmergencyAPI(createRaybotHTTPClient(robot.value!.ipAddress))

    try {
      // stop emergency
      await emergencyAPI.stopEmergency()

      // close cargo
      // await raybotCommandAPI.createCommand({
      //   type: 'CARGO_CLOSE',
      //   inputs: {
      //     motorSpeed: 50,
      //   },
      // })

      await new Promise(resolve => setTimeout(resolve, 1000))
      // cargo lift
      await raybotCommandAPI.createCommand({
        type: 'CARGO_LIFT',
        inputs: {
          motorSpeed: 100,
          position: 25,
        },
      })

      // move to home location
      const moveToHome = await raybotCommandAPI.createCommand({
        type: 'MOVE_TO',
        inputs: {
          location: homeLocation.value!.rfidTag,
          direction: 'BACKWARD',
          motorSpeed: 100,
        },
      })

      // wait for move to home to be completed
      do {
        const command = await raybotCommandAPI.getCommandById(moveToHome.id)
        if (command.status === 'SUCCEEDED' || command.status === 'FAILED') {
          loading.value = false
          break
        }
        await new Promise(resolve => setTimeout(resolve, 1000))
      } while (true)
    }
    catch (error) {
      loading.value = false
      console.error(error)
      return Promise.reject(error)
    }
  }

  return { abort, loading, isValid }
}
