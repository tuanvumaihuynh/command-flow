import type { RaybotHTTPClient } from '@/lib/http'
import type { EmergencyState } from '@/types/emergency'

export class EmergencyAPI {
  client: RaybotHTTPClient

  constructor(client: RaybotHTTPClient) {
    this.client = client
  }

  getEmergencyState(): Promise<EmergencyState> {
    return this.client.get('/emergency/state', {
      doNotShowLoading: true,
    })
  }

  stopEmergency(): Promise<void> {
    return this.client.post('/emergency/stop')
  }

  resumeEmergency(): Promise<void> {
    return this.client.post('/emergency/resume')
  }

  stopSystemEmergency(): Promise<void> {
    return this.client.post('/system/stop-emergency')
  }
}
