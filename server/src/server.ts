import { fastifyCors } from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { EmbeddingError } from './errors/embedding-error.ts'
import { UnprocessableAudioError } from './errors/unprocessable-audio-error.ts'
import { createQuestionRoute } from './http/routes/create-question.ts'
import { createRoomRoute } from './http/routes/create-room.ts'
import { getRoomQuestions } from './http/routes/get-room-questions.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'
import { uploadAudioRoute } from './http/routes/upload-audio.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
})

app.register(fastifyMultipart)

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return 'OK'
})

app.register(getRoomsRoute)
app.register(getRoomQuestions)
app.register(createRoomRoute)
app.register(createQuestionRoute)
app.register(uploadAudioRoute)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof UnprocessableAudioError || error instanceof EmbeddingError) {
    return reply.status(422).send({ error: 'Error processing the audio file' })
  }

  return reply.status(500).send({ error: 'Internal Server Error' })
})

// biome-ignore lint/suspicious/noConsole: server startup log
app.listen({ port: env.PORT }).then(() => console.log('HTTP server running!'))
