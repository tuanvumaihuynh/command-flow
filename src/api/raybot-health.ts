import type { RaybotHTTPClient } from '@/lib/http'

export interface RaybotHealth {
  status: 'ok'
}

export class RaybotHealthAPI {
  client: RaybotHTTPClient

  constructor(client: RaybotHTTPClient) {
    this.client = client
  }

  getHealth(): Promise<RaybotHealth> {
    return this.client.get('/health', {
      doNotShowLoading: true,
    })
  }
}
