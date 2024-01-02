import { Card, Stack, TextField, Typography } from '@mui/material'
import FiveStarReview from './FiveStarReview'
import * as types from './types'

const TeamReviewCard = ({ review }: { review: types.Review }) => {
  return (
    <Card sx={{ padding: '2rem', borderRadius: '2rem' }}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack>
          <Typography>질문</Typography>
          <Typography>{review.question}</Typography>
        </Stack>
        <Stack>
          <Typography>답변</Typography>
          {review.type === types.QuestionType.TEXT && <TextField />}
          {review.type === types.QuestionType.STARS && <FiveStarReview />}
        </Stack>
      </Stack>
    </Card>
  )
}

export default TeamReviewCard
