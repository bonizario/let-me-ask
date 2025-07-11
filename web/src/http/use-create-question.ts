import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { CreateQuestionRequest } from '@/http/types/create-question-request'
import type { CreateQuestionResponse } from '@/http/types/create-question-response'

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create-question'],
    mutationFn: async (data: CreateQuestionRequest): Promise<CreateQuestionResponse> => {
      const response = await fetch(`http://localhost:3333/rooms/${roomId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: data.question }),
      })
      const result: CreateQuestionResponse = await response.json()
      return result
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fetch-room-questions', roomId] })
    },
  })
}
