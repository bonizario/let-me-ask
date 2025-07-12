import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const createRoomRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms',
    {
      schema: {
        body: z.object({
          name: z.string().min(1),
          description: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { name, description } = request.body

      const result = await db
        .insert(schema.rooms)
        .values({ name, description })
        .returning({ id: schema.rooms.id })

      const createdRoom = result[0]

      if (!createdRoom) {
        throw new Error('Failed to create room')
      }

      return reply.status(201).send({ roomId: createdRoom.id })
    },
  )
}
