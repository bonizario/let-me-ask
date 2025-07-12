import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { CreateRoomRequest } from '@/http/types/create-room-request'
import type { CreateRoomResponse } from '@/http/types/create-room-response'

export function useCreateRoom() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create-room'],
    mutationFn: async (data: CreateRoomRequest): Promise<CreateRoomResponse> => {
      const response = await fetch('http://localhost:3333/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const result: CreateRoomResponse = await response.json()
      return result
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get-rooms'] })
    },
  })
}
