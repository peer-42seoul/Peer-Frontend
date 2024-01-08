'use client'

import { Avatar, Button, Card, Stack, Typography } from '@mui/material'
import { IApplicant } from '../../../types/types'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import useMedia from '@/hook/useMedia'
import FormAnswer from './RecuitFormAnswer'
import useAxiosWithAuth from '@/api/config'

const ApplicantList = ({
  close,
  teamId,
}: {
  close: () => void
  teamId: string
}) => {
  const { isPc } = useMedia()
  const [index, setIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const axiosWithAuth = useAxiosWithAuth()

  // TODO: DTO 맞추기

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/applicant/${teamId}`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )
  const [members, setMembers] = useState<IApplicant[]>([])
  const [member, setMember] = useState<IApplicant | null>(
    members ? members[index] : null,
  )

  useEffect(() => {
    console.log(data)
    setMember(data ? data[index] : null)
  }, [index, data])

  const handleAccept = () => {
    axiosWithAuth
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/applicant/accept/${teamId}`,
        {
          teamJobId: member!.applyId.teamJobId,
          teamUserId: member!.applyId.teamUserId,
        },
      )
      .then((res) => {
        if (res.status === 200) {
          // TODO:백엔드에서 제외 시키는 걸 생각
          setMembers(data)

          if (index > 0) setIndex(index - 1)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleReject = () => {
    console.log('reject')
    axiosWithAuth
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/applicant/reject/${teamId}`,
        {
          teamJobId: member!.applyId.teamJobId,
          teamUserId: member!.applyId.teamUserId,
        },
      )
      .then((res) => {
        if (res.status === 200) {
          // TODO:백엔드에서 제외 시키는 걸 생각
          setMembers(data)

          if (index > 0) setIndex(index - 1)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleNext = () => {
    if (index < members.length - 1) setIndex(index + 1)
  }

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1)
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }

    if (data) {
      setMembers(data)
      if (data.length >= index) {
        setMember(data[index])
      }
    }
  }, [index, data])

  if (isLoading) {
    return (
      <Stack border="1px solid" borderRadius={2} height={400}>
        <Typography>로딩중</Typography>
      </Stack>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Card sx={{ p: '1.5rem', borderRadius: '1rem', height: '23rem' }}>
        <Stack
          direction="row"
          display="flex"
          justifyContent="space-between"
          alignItems={'center'}
          mb={3}
        >
          <Typography fontWeight="bold">신청 대기자</Typography>
          <Button onClick={close} size="small">
            X
          </Button>
        </Stack>
        <Typography>신청한 대기자가 없습니다.</Typography>
      </Card>
    )
  }

  return (
    <Card sx={{ p: 3, borderRadius: '1rem', height: '23rem' }}>
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
          리스트로 돌아가기
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
        <Button disabled={index === 0 ? true : false} onClick={handlePrev}>
          ◀︎
        </Button>
        <Stack alignItems="center" spacing={1}>
          <Avatar>A</Avatar>
          {member && <Typography>{member.name}</Typography>}
        </Stack>

        <Button
          disabled={index + 1 === members.length ? true : false}
          onClick={handleNext}
        >
          ▶︎
        </Button>
      </Stack>

      <Stack direction="row" spacing={1} justifyContent={'center'}>
        <Button variant="contained" color="red" onClick={handleReject}>
          거절
        </Button>
        <Button variant="contained" color="green" onClick={handleAccept}>
          승인
        </Button>
      </Stack>

      <Stack p={2}>
        <Typography fontWeight="bold">인터뷰 답변</Typography>
        <Stack
          borderRadius={2}
          p={2}
          overflow="auto"
          height={isPc ? 300 : 100}
          ref={scrollRef}
        >
          {!member && <Typography>신청한 대기자가 없습니다.</Typography>}
          {member && member.answers ? (
            member.answers.map((interview, index) => (
              <Stack key={index} m={1}>
                <Typography fontWeight="bold">{interview.question}</Typography>
                <FormAnswer interview={interview} index={index} />
              </Stack>
            ))
          ) : (
            <Typography>인터뷰가 없습니다.</Typography>
          )}
        </Stack>
      </Stack>
    </Card>
  )
}

export default ApplicantList
