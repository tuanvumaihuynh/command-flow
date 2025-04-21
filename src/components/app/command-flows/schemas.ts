import { z } from 'zod'

export const createCommandFlowSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
})
