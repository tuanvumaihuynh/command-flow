import type { RaybotHTTPClient } from '@/lib/http'

export class EmergencyAPI {
  client: RaybotHTTPClient

  constructor(client: RaybotHTTPClient) {
    this.client = client
  }

  stopEmergency(): Promise<void> {
    return this.client.post('/system/stop-emergency')
  }
}
