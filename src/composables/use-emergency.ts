import { EmergencyAPI } from '@/api/emergency'
import { createRaybotHTTPClient } from '@/lib/http'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useDashboardLocalStorage } from './use-dashboard'

export const EMERGENCY_STATE_QUERY_KEY = 'emergencyState'

export function useEmergencyStateQuery() {
  const { robot } = useDashboardLocalStorage()

  const emergencyAPI = new EmergencyAPI(createRaybotHTTPClient(robot.value!.ipAddress))
  return useQuery({
    queryKey: [EMERGENCY_STATE_QUERY_KEY],
    queryFn: emergencyAPI.getEmergencyState,
  })
}

export function useEmergencyStopMutation() {
  const { robot } = useDashboardLocalStorage()

  const emergencyAPI = new EmergencyAPI(createRaybotHTTPClient(robot.value!.ipAddress))

  return useMutation({
    mutationFn: emergencyAPI.stopEmergency,
  })
}

export function useEmergencyResumeMutation() {
  const { robot } = useDashboardLocalStorage()

  const emergencyAPI = new EmergencyAPI(createRaybotHTTPClient(robot.value!.ipAddress))

  return useMutation({
    mutationFn: emergencyAPI.resumeEmergency,
  })
}
