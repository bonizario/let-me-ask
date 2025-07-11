import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateRoom } from '@/http/use-create-room'
import { Button } from './ui/button'

const createRoomFormSchema = z.object({
  name: z.string().min(1, { error: 'Name is required' }),
  description: z.string(),
})

type CreateRoomFormInput = z.input<typeof createRoomFormSchema>
type CreateRoomFormOutput = z.output<typeof createRoomFormSchema>

export function CreateRoomForm() {
  const createRoomForm = useForm<CreateRoomFormInput, unknown, CreateRoomFormOutput>({
    resolver: zodResolver(createRoomFormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const { mutateAsync: createRoom } = useCreateRoom()

  async function handleCreateRoom(data: CreateRoomFormOutput) {
    await createRoom({
      name: data.name,
      description: data.description,
    })
    createRoomForm.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create room</CardTitle>
        <CardDescription>
          Create a new room to start making questions and receiving answers from AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createRoomForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
          >
            <FormField
              control={createRoomForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={createRoomForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Create room
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
