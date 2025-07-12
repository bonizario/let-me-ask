import { GoogleGenAI } from '@google/genai'
import { env } from '../env.ts'

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
    throw new Error('Failed to transcribe audio')
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
    throw new Error('Failed to generate embeddings')
  }

  return response.embeddings[0].values
}

export async function generateAnswer(question: string, transcriptions: string[]) {
  const context = transcriptions.join('\n\n')

  const prompt = `
    You are an AI assistant that answers questions based on the provided context. Use the context to answer the question as accurately as possible in english.

    Context:
    ${context}

    Question:
    ${question}

    Instructions:
    - Use only the information from the context to answer the question.
    - If the question cannot be answered based on the context, respond with "I don't have enough information to answer that question."
    - Be concise and to the point.
    - Maintain a professional and informative tone.
    - Quote any relevant parts of the context in your answer.
    - If you quote the context, use the term "According to the class"
  `.trim()

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  })

  if (!response.text) {
    throw new Error('Failed to generate answer')
  }

  return response.text
}
