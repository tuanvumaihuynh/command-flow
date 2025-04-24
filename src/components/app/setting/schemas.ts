import { z } from 'zod'

const locationSchema = z.object({
  id: z.string(),
  name: z.string(),
  rfidTag: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const importDataSchema = z.object({
  locations: z.array(locationSchema),
})
