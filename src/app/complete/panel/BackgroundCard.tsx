'use client'

import { Card, Stack, Typography } from '@mui/material'
import * as types from './types'
import { useEffect, useState } from 'react'
import TeamReviewCard from './TeamReviewCard'

const mockQuestion: types.Review[] = [
  {
    id: '1',
    target: types.ReviewType.TEAM,
    type: types.QuestionType.TEXT,
    question: '팀원들의 업무를 잘 도와주셨나요?',
  },
  {
    id: '2',
    target: types.ReviewType.PEER,
    type: types.QuestionType.TEXT,
    question: '팀원들의 업무를 잘 도와주셨나요?',
  },
  {
    id: '3',
    target: types.ReviewType.SELF,
    type: types.QuestionType.TEXT,
    question: '팀원들의 업무를 잘 도와주셨나요?',
  },
  {
    id: '4',
    target: types.ReviewType.TEAM,
    type: types.QuestionType.STARS,
    question: '팀원들의 업무를 잘 도와주셨나요?',
  },
  {
    id: '5',
    target: types.ReviewType.PEER,
    type: types.QuestionType.STARS,
    question: '팀원들의 업무를 잘 도와주셨나요?',
  },
  {
    id: '6',
    target: types.ReviewType.SELF,
    type: types.QuestionType.STARS,
    question: '팀원들의 업무를 잘 도와주셨나요?',
  },
]

const BackgroundCard = () => {
  const [reviews, setReviews] = useState<types.Review[]>(mockQuestion)
  const [peerReviews, setPeerReviews] = useState<types.Review[]>(mockQuestion)
  const [selfReviews, setSelfReviews] = useState<types.Review[]>(mockQuestion)
  const [teamReviews, setTeamReviews] = useState<types.Review[]>(mockQuestion)

  useEffect(() => {
    setReviews(mockQuestion)
    setPeerReviews(
      reviews.filter((review) => review.target === types.ReviewType.PEER),
    )
    setSelfReviews(
      reviews.filter((review) => review.target === types.ReviewType.SELF),
    )
    setTeamReviews(
      reviews.filter((review) => review.target === types.ReviewType.TEAM),
    )
  }, [])

  return (
    <Stack className="no-scroll" sx={{ overflowY: 'auto', width: '70rem' }}>
      <Typography>PC Complete</Typography>
      <Card sx={{ overflow: 'visible' }}>
        <Stack spacing={'1rem'}>
          <Typography>Team Review</Typography>
          {teamReviews.map((review) => (
            <TeamReviewCard key={review.id} review={review} />
          ))}
        </Stack>
      </Card>
      <Card sx={{ overflow: 'visible' }}>
        <Stack spacing={'1rem'}>
          <Typography>Peer Review</Typography>
          {peerReviews.map((review) => (
            <TeamReviewCard key={review.id} review={review} />
          ))}
        </Stack>
      </Card>
      <Card sx={{ overflow: 'visible' }}>
        <Stack spacing={'1rem'}>
          <Typography>Self Review</Typography>
          {selfReviews.map((review) => (
            <TeamReviewCard key={review.id} review={review} />
          ))}
        </Stack>
      </Card>
    </Stack>
  )
}

export default BackgroundCard
