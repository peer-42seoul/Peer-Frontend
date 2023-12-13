import { Card, Stack, TextField, Typography } from '@mui/material'
import FiveStarReview from './FiveStarReview'

enum ReviewType {
  'TEAM',
  'SELF',
  'PEER',
}

enum QuestionType {
  'TEXT',
  'STARS',
}

interface Review {
  id: string
  question: string
  review_type: ReviewType
  question_type: QuestionType
}

const TeamReviewCard = ({ review }: { review: Review }) => {
  return (
    <Card sx={{ padding: '3rem', borderRadius: '2rem' }}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack>
          <Typography>질문</Typography>
          <Typography>{review.question}</Typography>
        </Stack>
        <Stack>
          <Typography>답변</Typography>
          {review.question_type === QuestionType.TEXT && <TextField />}
          {review.question_type === QuestionType.STARS && <FiveStarReview />}
        </Stack>
      </Stack>
    </Card>
  )
}

export default TeamReviewCard
