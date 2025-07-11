import { useQuery } from '@tanstack/react-query'

import type { GetRoomsResponse } from '@/http/types/get-rooms-response'

export function useRooms() {
  return useQuery({
    queryKey: ['fetch-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      const rooms: GetRoomsResponse = await response.json()
      return rooms
    },
  })
}
