import { QuestionItem } from '@/components/question-item'
import { useFetchRoomQuestions } from '@/http/use-fetch-room-questions'

interface QuestionListProps {
  roomId: string
}

export function QuestionList({ roomId }: QuestionListProps) {
  const { data } = useFetchRoomQuestions(roomId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">Questions & Answers</h2>
      </div>
      {data?.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  )
}
