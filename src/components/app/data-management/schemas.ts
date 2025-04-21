import { z } from 'zod'

const locationSchema = z.object({
  id: z.string(),
  name: z.string(),
  rfidTag: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const robotSchema = z.object({
  id: z.string(),
  name: z.string(),
  ipAddress: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const parameterSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['string', 'number', 'boolean', 'location']),
  description: z.string().optional(),
})

const commandSchema = z.object({
  index: z.number(),
  name: z.string(),
  type: z.enum([
    'STOP_MOVEMENT',
    'MOVE_TO',
    'MOVE_FORWARD',
    'MOVE_BACKWARD',
    'CARGO_OPEN',
    'CARGO_CLOSE',
    'CARGO_LIFT',
    'CARGO_LOWER',
    'CARGO_CHECK_QR',
    'SCAN_LOCATION',
    'WAIT',
  ]),
  inputs: z.record(z.any()),
  parameterMapping: z.record(z.string()).optional(),
})

const commandFlowSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  parameters: z.array(parameterSchema),
  commands: z.array(commandSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const importDataSchema = z.object({
  commandFlows: z.array(commandFlowSchema),
  locations: z.array(locationSchema),
  robots: z.array(robotSchema),
})

export type ImportData = z.infer<typeof importDataSchema>
