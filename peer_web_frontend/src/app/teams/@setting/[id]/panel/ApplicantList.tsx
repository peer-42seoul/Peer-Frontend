'use client'

import { Avatar, Button, Stack, Typography } from '@mui/material'
import { IApplicant } from '../page'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'
import axios from 'axios'

const ApplicantList = ({
  close,
  teamId,
}: {
  close: () => void
  teamId: string
}) => {
  const [index, setIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { data, isLoading } = useSWR(
    `https://c4f7d82c-8418-4e7e-bd40-b363bad0ef04.mock.pstmn.io/api/v1/team/applicant/1`,
    defaultGetFetcher,
  )
  // const { data, isLoading } = useSWR(
  //   `https://c4f7d82c-8418-4e7e-bd40-b363bad0ef04.mock.pstmn.io/api/v1/team/applicant/${teamId}`,
  //   defaultGetFetcher,
  // )
  const [members, setMembers] = useState<IApplicant[]>([])
  const [member, setMember] = useState<IApplicant | null>(
    members ? members[index] : null,
  )

  const handleAccept = () => {
    axios
      .put(
        `https://c4f7d82c-8418-4e7e-bd40-b363bad0ef04.mock.pstmn.io/api/v1/team/accept/1?userId=1`,
      )
      // .put(
      //   `https://c4f7d82c-8418-4e7e-bd40-b363bad0ef04.mock.pstmn.io/api/v1/team/accept/${teamId}?userId=${
      //     member!.id
      //   }`,
      // )
      .then((res) => {
        if (res.status === 200) {
          console.log('member.id', member!.id)
          setMembers(
            members.length === 1
              ? []
              : members.filter((m) => m.id !== member!.id),
          ) // TODO:백엔드에서 제외 시키는 걸 생각
          if (index > 0) setIndex(index - 1)
          console.log('accept', teamId)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleReject = () => {
    console.log('reject')
    // 거절 API 필요
    setMembers(
      members.length === 1 ? [] : members.filter((m) => m.id !== member!.id),
    ) // TODO:백엔드에서 제외 시키는 걸 생각
    setIndex(index > 0 ? index - 1 : index)
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

  if (!data || members.length === 0) {
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
    <>
      <Stack border="1px solid" borderRadius={2} height={400}>
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
            {member && <Typography>{member.name}</Typography>}
          </Stack>
          <Button onClick={handleNext}>▶︎</Button>
        </Stack>
        <Stack border="1px solid" borderRadius={2} p={2}>
          <Typography fontWeight="bold">팀 신청 설문</Typography>
          <Stack
            border="1px solid"
            borderRadius={2}
            p={2}
            overflow="auto"
            height={100}
            ref={scrollRef}
          >
            {}
            {member
              ? member.interview.map((interview, index) => (
                  <Stack key={index} m={1}>
                    <Typography fontWeight="bold">
                      {interview.question}
                    </Typography>
                    <Typography>{interview.answer}</Typography>
                  </Stack>
                ))
              : null}
          </Stack>
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
      </Stack>
    </>
  )
}

export default ApplicantList
