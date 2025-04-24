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
export const importDataSchema = z.object({
  locations: z.array(locationSchema),
  dashboard: dashboardSchema,
  robots: z.array(robotSchema),
})
