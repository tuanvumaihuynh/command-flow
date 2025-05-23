import { z } from 'zod'

const locationSchema = z.object({
  id: z.string(),
  name: z.string(),
  rfidTag: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const dashboardSchema = z.object({
  homeLocationId: z.string(),
  kitchenLocationId: z.string(),
  robotId: z.string(),
})

const robotSchema = z.object({
  id: z.string(),
  name: z.string(),
  ipAddress: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const moveToSchema = z.object({
  motorSpeed: z.number().min(0).max(100),
})

const cargoOpenSchema = z.object({
  motorSpeed: z.number().min(0).max(100),
})

const cargoCloseSchema = z.object({
  motorSpeed: z.number().min(0).max(100),
})

const cargoLiftSchema = z.object({
  motorSpeed: z.number().min(0).max(100),
  position: z.number().min(0),
})

const cargoLowerSchema = z.object({
  motorSpeed: z.number().min(0).max(100),
  position: z.number().min(0),
  bottomObstacleTracking: z.object({
    enterDistance: z.number().min(0),
    exitDistance: z.number().min(0),
  }),
})

export const commandConfigSchema = z.object({
  MOVE_TO: moveToSchema,
  CARGO_OPEN: cargoOpenSchema,
  CARGO_CLOSE: cargoCloseSchema,
  CARGO_LIFT: cargoLiftSchema,
  CARGO_LOWER: cargoLowerSchema,
})
export const importDataSchema = z.object({
  locations: z.array(locationSchema),
  dashboard: dashboardSchema,
  robots: z.array(robotSchema),
  commandConfig: commandConfigSchema,
})
