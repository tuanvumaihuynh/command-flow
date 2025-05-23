import { EmergencyAPI } from '@/api/emergency'
import { RaybotCommandAPI } from '@/api/raybot-command'
import { createRaybotHTTPClient } from '@/lib/http'
import { ref } from 'vue'
import { useCommandConfigLocalStorage } from './use-command-config'
import { useDashboardLocalStorage } from './use-dashboard'

export function useAbort() {
  const { homeLocation, kitchenLocation, robot } = useDashboardLocalStorage()
  const loading = ref(false)
  const { commandConfig, getCommandConfigByType } = useCommandConfigLocalStorage()

  const isValid = computed(() => homeLocation.value && kitchenLocation.value && robot.value && Object.keys(commandConfig.value).length !== 0)

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

      // wait for emergency to be stopped
      await new Promise(resolve => setTimeout(resolve, 1000))

      // cargo lift
      await raybotCommandAPI.createCommand({
        type: 'CARGO_LIFT',
        inputs: getCommandConfigByType('CARGO_LIFT'),
      })

      // move to home location
      const moveToHome = await raybotCommandAPI.createCommand({
        type: 'MOVE_TO',
        inputs: {
          location: homeLocation.value!.rfidTag,
          direction: 'FORWARD',
          ...getCommandConfigByType('MOVE_TO'),
        },
      })

      // wait for move to home to be completed
      do {
        const command = await raybotCommandAPI.getCommandById(moveToHome.id)
        if (command.status === 'SUCCEEDED') {
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

  return { abort, loading }
}
