'use client'

import { Button, Stack, Typography } from '@mui/material'
import SetupPage from './panel/SetupTeam'
import { useState } from 'react'
import SetupMember from './panel/SetupMember'
import ApplicantList from './panel/ApplicantList'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'
import { useRouter } from 'next/navigation'

export enum TeamType {
  PROJECT = 'PROJECT',
  STUDY = 'STUDY',
}

export enum TeamStatus {
  RECRUITING = 'RECRUITING',
  BEFORE = 'BEFORE',
  ONGOING = 'ONGOING',
  COMPLETE = 'COMPLETE',
}

export enum TeamGrant {
  LEADER = 'LEADER',
  MEMBER = 'MEMBER',
}

export enum TeamOperationForm {
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
  MIX = 'MIX',
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
    imageUrl: string | null
  }
  member: IMember[]
}

const mockdate: ITeam = {
  team: {
    id: '1',
    type: TeamType.PROJECT,
    name: 'Sample',
    maxMember: '5',
    status: TeamStatus.RECRUITING,
    dueTo: '2021-10-10',
    operationForm: TeamOperationForm.MIX,
    region: ['서울', '경기'],
    imageUrl: null,
  },
  member: [
    {
      name: '이름',
      userId: '1',
      grant: TeamGrant.LEADER,
    },
    {
      name: '이름',
      userId: '2',
      grant: TeamGrant.MEMBER,
    },
    {
      name: '이름',
      userId: '3',
      grant: TeamGrant.MEMBER,
    },
    {
      name: '이름',
      userId: '4',
      grant: TeamGrant.MEMBER,
    },
    {
      name: '이름',
      userId: '5',
      grant: TeamGrant.MEMBER,
    },
  ],
}

export enum EInterviewType {
  CLOSE = 'close',
  OPEN = 'OPEN',
  RATIO = 'RATIO',
  CHECK = 'CHECK',
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
  const router = useRouter()
  const [showApplicant, setShowApplicant] = useState<boolean>(false)
  const { data, isLoading } = useSWR<ITeam>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/setting/${id}`,
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
        <>
          <SetupPage team={mockdate} />
          <SetupMember team={mockdate.member} teamId={mockdate.team.id} />
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
      )}
      <Button
        variant="contained"
        onClick={() => router.push(`/recruitment/${id}`)}
      >
        모집 글 보기
      </Button>
      <Button
        variant="contained"
        onClick={() => router.push(`/recruitment/edit/${id}`)}
      >
        모집 글 수정하기
      </Button>
    </Stack>
  )
}

export default TeamsSetupPage
