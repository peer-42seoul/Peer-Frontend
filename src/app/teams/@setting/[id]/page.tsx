'use client'

import { Button, Stack, Typography } from '@mui/material'
import SetupPage from './panel/SetupTeam'
import { useState } from 'react'
import SetupMember from './panel/SetupMember'
import ApplicantList from './panel/ApplicantList'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'

export enum TeamType {
  PROJECT = 'project',
  STUDY = 'study',
}

export enum TeamStatus {
  RECRUITING = 'recruiting',
  BEFORE = 'before',
  ONGOING = 'ongoing',
  COMPLETE = 'complete',
}

export enum TeamGrant {
  LEADER = 'leader',
  MEMBER = 'member',
}

export enum TeamOperationForm {
  OFFLINE = 'offline',
  ONLINE = 'online',
  MIX = 'mix',
}
export interface IMember {
  name: string
  userId: string
  grant: TeamGrant
}

export interface ITeam {
  team: {
    id: string
    type: TeamType
    name: string
    maxMember: String
    status: TeamStatus
    dueTo: string
    operationForm: TeamOperationForm
    region: string[]
    imageUrl: string
  }
  member: IMember[]
}

export enum EInterviewType {
  CLOSE = 'close',
  OPEN = 'open',
  RATIO = 'ratio',
  CHECK = 'check',
}

//TODO: 타입 묶기
export type CloseQuestionList = string[]

export type RatioQuestionList = {
  number: string
  option1: string
  option2: string
}

export type CheckQuestionList = string[]

export interface IInterview {
  question: string
  answer: string
  type: EInterviewType
  optionList: CloseQuestionList | RatioQuestionList | CheckQuestionList | null
}

export interface IApplicant {
  name: string
  userId: string
  interview: IInterview[]
}

const TeamsSetupPage = ({ id }: { id: number }) => {
  console.log(id)
  const [showApplicant, setShowApplicant] = useState<boolean>(false)
  const { data, isLoading } = useSWR<ITeam>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/setting/1`,
    defaultGetFetcher,
  )

  const openApplicant = () => setShowApplicant(true)
  const closeApplicant = () => setShowApplicant(false)

  if (isLoading) return <Typography>로딩중</Typography>

  return (
    <Stack
      margin={4}
      spacing={2}
      direction={'column'}
      flex={4}
      border="1px solid"
      borderRadius={2}
      padding={2}
    >
      {data ? (
        <>
          <SetupPage team={data} />
          {!showApplicant ? (
            <>
              <SetupMember team={data.member} teamId={data.team.id} />
              <Button
                onClick={openApplicant}
                sx={{ mt: 1 }}
                variant="contained"
                color="primary"
                fullWidth
              >
                신청 대기자 보기
              </Button>
            </>
          ) : (
            <ApplicantList close={closeApplicant} teamId={data.team.id} />
          )}
        </>
      ) : (
        <Typography>팀을 추가해주세요</Typography>
      )}
      <Button variant="contained">모집 글 보기</Button>
      <Button variant="contained">모집 글 수정하기</Button>
    </Stack>
  )
}

export default TeamsSetupPage
