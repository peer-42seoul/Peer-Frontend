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
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/api/v1/team/accept/${teamId}?userId=${member!.userId}`,
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/deny/${teamId}?userId=${
          member!.userId
        }`,
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

  if (!data) {
    return (
      <>
        <Stack border="1px solid" borderRadius={2} height={400}>
          <Stack
            direction="row"
            display="flex"
            justifyContent="space-between"
            p={2}
          >
            <Typography fontWeight="bold">신청 대기자</Typography>
            <Button onClick={close} size="small">
              X
            </Button>
          </Stack>
          <Typography>신청한 대기자가 없습니다.</Typography>
        </Stack>
      </>
    )
  }

  return (
    <Card sx={{ p: 3, borderRadius: '10px' }}>
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
        height={'10rem'}
        p={2}
      >
        <Button onClick={handlePrev}>◀︎</Button>
        <Stack alignItems="center" spacing={1}>
          <Avatar>A</Avatar>
          {member && <Typography>{member.name}</Typography>}
        </Stack>
        <Button onClick={handleNext}>▶︎</Button>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAccept}
        >
          승인
        </Button>
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleReject}
        >
          거절
        </Button>
      </Stack>

      <Stack border="1px solid" borderRadius={2} p={2}>
        <Typography fontWeight="bold">팀 신청 설문</Typography>
        <Stack
          border="1px solid"
          borderRadius={2}
          p={2}
          overflow="auto"
          height={isPc ? 300 : 100}
          ref={scrollRef}
        >
          {member && member.interview ? (
            member.interview.map((interview, index) => (
              <Stack key={index} m={1}>
                <Typography fontWeight="bold">{interview.question}</Typography>
                <FormAnswer interview={interview} index={index} />
              </Stack>
            ))
          ) : (
            <Stack border="1px solid" borderRadius={2} height={400}>
              <Stack
                direction="row"
                display="flex"
                justifyContent="space-between"
                p={2}
              >
                <Typography fontWeight="bold">신청 대기자</Typography>
                <Button onClick={close} size="small">
                  X
                </Button>
              </Stack>
              <Typography>신청한 대기자가 없습니다.</Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Card>
  )
}

export default ApplicantList
