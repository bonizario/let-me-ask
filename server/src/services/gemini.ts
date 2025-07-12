import { GoogleGenAI } from '@google/genai'
import { env } from '../env.ts'
import { EmbeddingError } from '../errors/embedding-error.ts'
import { UnprocessableAudioError } from '../errors/unprocessable-audio-error.ts'

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
})

const model = 'gemini-2.5-flash'

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcribe the audio to english. Be precise and natural in the transcription. Maintain correct punctuation and divide the text into paragraphs as needed',
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  })

  if (!response.text) {
    throw new UnprocessableAudioError()
  }

  return response.text
}

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [{ text }],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT',
    },
  })

  if (!response.embeddings?.[0]?.values) {
    throw new EmbeddingError()
  }

  return response.embeddings[0].values
}
