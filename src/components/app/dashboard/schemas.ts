import { z } from 'zod'

export const dashboardSchema = z.object({
  homeLocation: z.string(),
  kitchenLocation: z.string(),
})
