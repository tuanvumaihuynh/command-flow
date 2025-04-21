import type { CommandInputMap, CommandType } from './raybot-command'

export type ParameterType = 'string' | 'number' | 'boolean' | 'location'

export interface FlowParameter {
  id: string
  name: string
  type: ParameterType
  description?: string
}

export interface Command<T extends CommandType = CommandType> {
  index: number
  type: T
  inputs: CommandInputMap[T]
  parameterMapping?: Record<string, string> // Map input field to parameter ID
}

export interface CommandFlow {
  id: string
  name: string
  description?: string
  parameters: FlowParameter[]
  commands: Command[]
  createdAt: string
  updatedAt: string
}
