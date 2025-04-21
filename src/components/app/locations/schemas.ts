import { z } from 'zod'

export const createLocationSchema = z.object({
  name: z.string().min(1),
  rfidTag: z.string().min(1),
})

export const updateLocationSchema = createLocationSchema.partial()
