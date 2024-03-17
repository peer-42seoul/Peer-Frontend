'use client'

import {
  Avatar,
  Button,
  Card,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { IApplicant } from '../../../types/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import FormAnswer from './InterviewAnswerForm'
import useAxiosWithAuth from '@/api/config'
import { CloseIcon } from '@/icons'
import { NextButton, PrevButton } from './Icons'
import Tutorial from '@/components/Tutorial'
import TeamApplicantTutorial from '@/components/tutorialContent/TeamApplicantTutorial'
import useToast from '@/states/useToast'
import CuCircularProgress from '@/components/CuCircularProgress'
import useMedia from '@/hook/useMedia'

const ApplicantList = ({
  mutate,
  close,
  teamId,
}: {
  mutate: () => void
  close: () => void
  teamId: string
}) => {
  const { isPc } = useMedia()
  const [index, setIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const axiosWithAuth = useAxiosWithAuth()
  const { openToast } = useToast()

  // TODO: DTO 맞추기

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/team/applicant/${teamId}`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )
  const [members, setMembers] = useState<IApplicant[]>([])
  const [member, setMember] = useState<IApplicant | null>(
    members ? members[index] : null,
  )

  useEffect(() => {
    setMember(data ? data[index] : null)
  }, [index, data])

  const handleAccept = useCallback(() => {
    axiosWithAuth
      .put(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/team/applicant/accept/${teamId}`,
        {
          teamJobId: member!.applyId.teamJobId,
          teamUserId: member!.applyId.teamUserId,
        },
      )
      .then((res) => {
        if (res.status === 200) {
          // TODO:백엔드에서 제외 시키는 걸 생각
          setMembers(res.data)
          if (index > 0) {
            setIndex(index - 1)
          }
          mutate()
          openToast({
            severity: 'success',
            message: '신청이 승인되었습니다.',
          })
        } else if (res.status === 403) {
          openToast({
            severity: 'error',
            message: '권한이 없습니다.',
          })
        }
      })
      .catch(() => {
        openToast({
          severity: 'error',
          message: '승인에 실패했습니다.',
        })
      })
  }, [index, member, data, mutate])

  const handleReject = useCallback(() => {
    axiosWithAuth
      .put(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/team/applicant/reject/${teamId}`,
        {
          teamJobId: member!.applyId.teamJobId,
          teamUserId: member!.applyId.teamUserId,
        },
      )
      .then((res) => {
        if (res.status === 200) {
          // TODO:백엔드에서 제외 시키는 걸 생각
          setMembers(res.data)

          if (index > 0) {
            setIndex(index - 1)
          }
          mutate()
          openToast({
            severity: 'success',
            message: '신청이 거절되었습니다.',
          })
        } else if (res.status === 403) {
          openToast({
            severity: 'error',
            message: '권한이 없습니다.',
          })
        }
      })
      .catch(() => {
        openToast({
          severity: 'error',
          message: '승인에 실패했습니다.',
        })
      })
  }, [index, member, data, mutate])

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
    return <CuCircularProgress color="primary" />
  }

  if (!data || data.length === 0) {
    return (
      <Card
        sx={{
          p: '1.5rem',
          borderRadius: '1rem',
          height: '23rem',
          backgroundColor: 'background.secondary',
        }}
      >
        <Stack
          direction="row"
          display="flex"
          justifyContent="space-between"
          alignItems={'center'}
          mb={3}
        >
          <Stack direction="row" alignItems="center">
            <Typography fontWeight="bold">신청 대기자</Typography>
            <Tutorial
              title={'신청 대기자 보기'}
              content={<TeamApplicantTutorial />}
            />
          </Stack>
          <IconButton onClick={close} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
        <Typography>신청한 대기자가 없습니다.</Typography>
      </Card>
    )
  }

  return (
    <Card
      sx={{
        p: isPc ? 3 : 0,
        minWidth: isPc ? '45rem' : '',
        borderRadius: '1rem',
        height: isPc ? '23rem' : '100%',
      }}
    >
      <Stack
        direction={isPc ? 'row' : 'column'}
        display={'flex'}
        justifyContent={'space-evenly'}
      >
        <Stack width={isPc ? '20rem' : '100%'}>
          <Stack
            direction="row"
            display="flex"
            justifyContent="space-between"
            p={2}
          >
            <Stack direction="row" alignItems="center">
              <Typography fontWeight="bold">
                신청 대기자 {index + 1} / {members.length}
              </Typography>
              <Tutorial
                title={'신청 대기자 보기'}
                content={<TeamApplicantTutorial />}
              />
            </Stack>
          </Stack>
          <Stack
            direction={'row'}
            display="flex"
            justifyContent="space-between"
            margin="auto"
            width="80%"
            p={isPc ? 2 : 0}
          >
            <IconButton
              disabled={index === 0 ? true : false}
              onClick={handlePrev}
            >
              <PrevButton />
            </IconButton>
            <Stack alignItems="center" spacing={1}>
              <Stack alignItems="center" spacing={2} minHeight={'8rem'}>
                <Avatar
                  src={member?.image ? member.image : '/icons/ios/128.png'}
                />
                {member && (
                  <Typography variant="Body1Emphasis">{member.name}</Typography>
                )}
              </Stack>
              {member?.jobName && (
                <Typography>
                  {member.jobName == 'STUDY' ? '스터디 팀원' : member.jobName}
                </Typography>
              )}
            </Stack>

            <IconButton
              disabled={index + 1 === members.length ? true : false}
              onClick={handleNext}
            >
              <NextButton />
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={1} justifyContent={'center'}>
            <Button variant="contained" color="red" onClick={handleReject}>
              거절
            </Button>
            <Button variant="contained" color="green" onClick={handleAccept}>
              승인
            </Button>
          </Stack>
        </Stack>
        <Stack p={2} spacing={1}>
          <Typography fontWeight="bold">인터뷰 답변</Typography>
          <Stack
            borderRadius={2}
            p={isPc ? 2 : 0}
            overflow={'auto'}
            height={isPc ? '16rem' : '100%'}
            width={isPc ? '20rem' : '100%'}
            ref={scrollRef}
          >
            <Stack height={'fit-content'} spacing={'1rem'}>
              {!member && <Typography>신청한 사람이 없습니다.</Typography>}
              {member && member.answers ? (
                member.answers.map((interview, index) => (
                  <Card
                    key={interview.question}
                    sx={{
                      backgroundColor: 'background.secondary',
                      padding: '1rem',
                      height: 'fit-content',
                    }}
                  >
                    <Stack spacing={'0.5rem'}>
                      <Typography variant="Body1Emphasis">
                        {interview.question}
                      </Typography>
                      <FormAnswer interview={interview} index={index} />
                    </Stack>
                  </Card>
                ))
              ) : (
                <Typography>인터뷰가 없습니다.</Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )
}

export default ApplicantList
