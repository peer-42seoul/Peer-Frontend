'use client'

import { Avatar, Button, Stack, Typography } from '@mui/material'
import { IApplicant } from '../[id]/page'
import { useEffect, useState } from 'react'

const applicantMock: IApplicant[] = [
  {
    name: '김철수',
    id: '123',
    interview: [
      {
        question: '이름은?',
        answer: '김철수',
      },
      {
        question: '나이는?',
        answer: '20',
      },
    ],
  },
  {
    name: '김영희',
    id: '123',
    interview: [
      {
        question: '이름은?',
        answer: '김영희',
      },
      {
        question: '나이는?',
        answer: '20',
      },
    ],
  },
]

const ApplicantList = ({ close }: { close: () => void }) => {
  const [index, setIndex] = useState(0)
  const [members, setMembers] = useState<IApplicant[]>([])
  const [member, setMember] = useState(members[index])

  useEffect(() => {
    setMembers(applicantMock)
    setMember(members[index])
  }, [index, members, member])

  const handleNext = () => {
    if (index < members.length - 1) setIndex(index + 1)
  }

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1)
  }

  if (!member) return <p> 로딩 중</p>

  return (
    <>
      <Stack border="1px solid" borderRadius={2}>
        <Stack
          direction="row"
          display="flex"
          justifyContent="space-between"
          p={2}
        >
          <Typography fontWeight="bold">
            신청 대기자 {index + 1} / {members.length}
          </Typography>
          <Button onClick={close} size="small">
            X
          </Button>
        </Stack>
        <Stack
          direction="row"
          display="flex"
          justifyContent="space-between"
          margin="auto"
          width="80%"
          p={2}
        >
          <Button onClick={handlePrev}>◀︎</Button>
          <Stack alignItems="center" spacing={1}>
            <Avatar>A</Avatar>
            <Typography>{member.name}</Typography>
          </Stack>
          <Button onClick={handleNext}>▶︎</Button>
        </Stack>
        <Stack border="1px solid" borderRadius={2} p={2}>
          <Typography fontWeight="bold">팀 신청 설문</Typography>
          {member.interview.map((interview, index) => (
            <Stack key={index} m={1}>
              <Typography fontWeight="bold">{interview.question}</Typography>
              <Typography>{interview.answer}</Typography>
            </Stack>
          ))}
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" color="primary" fullWidth>
            승인
          </Button>
          <Button variant="contained" color="error" fullWidth>
            거절
          </Button>
        </Stack>
      </Stack>
    </>
  )
}

export default ApplicantList
