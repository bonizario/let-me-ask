import { z } from 'zod'

const schema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.url().startsWith('postgresql://'),
  GEMINI_API_KEY: z.string().min(1),
})

export const env = schema.parse(process.env)
