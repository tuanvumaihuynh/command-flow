import { z } from 'zod'

const locationSchema = z.object({
  id: z.string(),
  name: z.string(),
  rfidTag: z.string(),
  speedGoToHome: z.number(),
  speedGoToKitchen: z.number(),
  speedDelivery: z.number(),
  lowerPosition: z.number(),
  directionToHome: z.union([z.literal('FORWARD'), z.literal('BACKWARD')]),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const dashboardSchema = z.object({
  homeLocationId: z.string(),
  kitchenLocationId: z.string(),
  robotId: z.string(),
  cargoWaitTime: z.number(),
  cargoLiftPosition: z.number(),
})

const robotSchema = z.object({
  id: z.string(),
  name: z.string(),
  ipAddress: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export const importDataSchema = z.object({
  locations: z.array(locationSchema),
  dashboard: dashboardSchema,
  robots: z.array(robotSchema),
})
