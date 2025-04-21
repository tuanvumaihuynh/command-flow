import { z } from 'zod'

export const createParameterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.union([
    z.literal('string'),
    z.literal('number'),
    z.literal('boolean'),
    z.literal('location'),
  ]),
  description: z.string().optional(),
})
