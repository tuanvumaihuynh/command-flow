import { z } from 'zod'

export const createLocationSchema = z.object({
  name: z.string().min(1),
  rfidTag: z.string().min(1),
  speedGoToHome: z.number().min(0).max(100).default(100),
  speedGoToKitchen: z.number().min(0).max(100).default(100),
  speedDelivery: z.number().min(0).max(100).default(80),
  lowerPosition: z.number().min(0).max(250).default(240),
  directionToHome: z.union([z.literal('FORWARD'), z.literal('BACKWARD')]).default('FORWARD'),
  directionToLocation: z.union([z.literal('FORWARD'), z.literal('BACKWARD')]).default('FORWARD'),
})

export const updateLocationSchema = createLocationSchema.partial()
