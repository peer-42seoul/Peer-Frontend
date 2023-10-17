'use client'

import { Avatar, Button, Stack, Typography } from '@mui/material'
import { IApplicant } from '../page'
import { useEffect, useState } from 'react'
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
  const { data, isLoading } = useSWR(
    `https://21bf1e8a-2c5e-466f-8261-fa05ad3bde03.mock.pstmn.io/api/v1/team/applicant/1`,
    defaultGetFetcher,
  )
  // const { data, isLoading } = useSWR(
  //   `https://21bf1e8a-2c5e-466f-8261-fa05ad3bde03.mock.pstmn.io/api/v1/team/applicant/${teamId}`,
  //   defaultGetFetcher,
  // )
  const [members, setMembers] = useState<IApplicant[]>([])
  const [member, setMember] = useState<IApplicant | null>(
    members ? members[index] : null,
  )

  const handleAccept = () => {
    axios
      .put(
        `https://21bf1e8a-2c5e-466f-8261-fa05ad3bde03.mock.pstmn.io/api/v1/team/accept/${teamId}?userId=${
          member!.id
        }`,
      )
      .then((res) => {
        if (res.status === 200) {
          setMembers(res.data.applicant)
          console.log('accept')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleReject = () => {
    console.log('reject')
  }

  useEffect(() => {
    setMembers(data)
    setMember(members ? members[index] : null)
  }, [index, members, data])

  const handleNext = () => {
    if (index < members.length - 1) setIndex(index + 1)
  }

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1)
  }

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
            <Typography>{member!.name}</Typography>
          </Stack>
          <Button onClick={handleNext}>▶︎</Button>
        </Stack>
        <Stack border="1px solid" borderRadius={2} p={2}>
          <Typography fontWeight="bold">팀 신청 설문</Typography>
          {member!.interview.map((interview, index) => (
            <Stack key={index} m={1}>
              <Typography fontWeight="bold">{interview.question}</Typography>
              <Typography>{interview.answer}</Typography>
            </Stack>
          ))}
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
