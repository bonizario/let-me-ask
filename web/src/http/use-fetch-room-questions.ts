import { useQuery } from '@tanstack/react-query'

import type { GetRoomQuestionsResponse } from '@/http/types/get-room-questions-response'

export function useFetchRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ['fetch-room-questions', roomId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/rooms/${roomId}/questions`)
      const rooms: GetRoomQuestionsResponse = await response.json()
      return rooms
    },
  })
}
