import { z } from 'zod'

export const createRobotSchema = z.object({
  name: z.string().min(1),
  ipAddress: z.string().min(1),
})

export const updateRobotSchema = createRobotSchema.partial()
