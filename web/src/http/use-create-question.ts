import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { CreateQuestionRequest } from '@/http/types/create-question-request'
import type { CreateQuestionResponse } from '@/http/types/create-question-response'
import type { GetRoomQuestionsResponse } from './types/get-room-questions-response'

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
    // onSuccess: async () => {
    //   await queryClient.invalidateQueries({ queryKey: ['get-room-questions', roomId] })
    // },
    onMutate: ({ question }) => {
      const questions =
        queryClient.getQueryData<GetRoomQuestionsResponse>(['get-room-questions', roomId]) ?? []

      const newQuestion: GetRoomQuestionsResponse[number] = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true,
      }

      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ['get-room-questions', roomId],
        [newQuestion, ...questions],
      )

      return { newQuestion, questions }
    },
    onSuccess(data, _variables, context) {
      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ['get-room-questions', roomId],
        questions => {
          if (!(questions && context.newQuestion)) {
            return questions
          }

          return questions.map(question => {
            if (question.id === context.newQuestion.id) {
              return {
                ...context.newQuestion,
                id: data.questionId,
                answer: data.answer,
                isGeneratingAnswer: false,
              }
            }
            return question
          })
        },
      )
    },
    onError: (_error, _variables, context) => {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionsResponse>(
          ['get-room-questions', roomId],
          context.questions,
        )
      }
    },
  })
}
