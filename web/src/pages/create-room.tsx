import { useQuery } from '@tanstack/react-query'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { dayjs } from '@/lib/dayjs'

type GetRoomsAPIResponse = {
  id: string
  name: string
  questionsCount: number
  createdAt: string
}[]

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ['fetch-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      const rooms: GetRoomsAPIResponse = await response.json()
      return rooms
    },
  })

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <div />

          <Card>
            <CardHeader>
              <CardTitle>Recent rooms</CardTitle>
              <CardDescription>Quick access to recently created rooms</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-3">
              {isLoading && (
                <Loader2 className="mx-auto size-6 animate-spin text-muted-foreground" />
              )}
              {data?.map((room) => (
                <Link
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/30"
                  key={room.id}
                  to={`/rooms/${room.id}`}
                >
                  <div className="flex flex-1 flex-col gap-1">
                    <h3 className="font-medium">{room.name}</h3>

                    <div className="fle items-center gap-2">
                      <Badge variant="secondary">{dayjs(room.createdAt).fromNow()}</Badge>
                      <Badge variant="secondary">
                        {room.questionsCount} question{room.questionsCount !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </div>

                  <span className="flex items-center gap-1 text-sm">
                    Join <ArrowRight className="size-3" />
                  </span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
