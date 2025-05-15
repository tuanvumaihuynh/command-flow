import type { RaybotHTTPClient } from '@/lib/http'
import type { CommandInputMap, CommandType, RaybotCommand } from '@/types/raybot-command'

export interface CreateCommandParams<T extends CommandType> {
  type: T
  inputs: CommandInputMap[T]
}

export class RaybotCommandAPI {
  client: RaybotHTTPClient

  constructor(client: RaybotHTTPClient) {
    this.client = client
  }

  getCurrentProcessingCommand(): Promise<RaybotCommand> {
    return this.client.get('/commands/processing', { doNotShowLoading: true })
  }

  getCommandById(id: number): Promise<RaybotCommand> {
    return this.client.get(`/commands/${id}`, { doNotShowLoading: true })
  }

  createCommand<T extends CommandType>(params: CreateCommandParams<T>): Promise<RaybotCommand<T>> {
    return this.client.post('/commands', params)
  }
}
