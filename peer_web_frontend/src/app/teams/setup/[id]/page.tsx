'use client'

import { Button, Stack } from '@mui/material'
import SetupPage from '../panel/SetupTeam'
import { useEffect, useState } from 'react'
import useMedia from '@/hook/useMedia'
import SetupMember from '../panel/SetupMember'
import ApplicantList from '../panel/ApplicantList'

export interface IMember {
  name: string
  id: string
  grant: boolean
}

export interface ITeam {
  team: {
    id: string
    type: string
    name: string
    dueTo: string
    operationForm: string
    region: string[]
  }
  member: IMember[]
}

const mockdata: ITeam = {
  team: {
    id: '0',
    name: '프로젝트 1',
    type: '프로젝트',
    dueTo: '10개월',
    operationForm: '온라인',
    region: ['서울', '경기', '인천'],
  },
  member: [
    {
      name: '김철수',
      id: '123',
      grant: true,
    },
    {
      name: '김철수',
      id: '123',
      grant: true,
    },
    {
      name: '김철수',
      id: '123',
      grant: true,
    },
    {
      name: '김철수',
      id: '123',
      grant: true,
    },
  ],
}

interface interview {
  question: string
  answer: string
}

export interface IApplicant {
  name: string
  id: string
  interview: interview[]
}

const TeamsSetupPage = ({ params }: { params: { id: string } }) => {
  const { isPc } = useMedia()
  const { id } = params
  const [team, setTeam] = useState<ITeam>()
  const [showApplicant, setShowApplicant] = useState<boolean>(false)

  useEffect(() => {
    setTeam(mockdata)
  }, [team, id])

  const openApplicant = () => setShowApplicant(true)
  const closeApplicant = () => setShowApplicant(false)

  return (
    <Stack
      margin={4}
      spacing={2}
      direction={isPc ? 'row' : 'column'}
      flex={4}
      border="1px solid"
      borderRadius={2}
      padding={2}
    >
      {team && <SetupPage team={team} />}
      {team && (
        <>
          {!showApplicant && (
            <>
              <SetupMember team={team.member} />
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
          {showApplicant && <ApplicantList close={closeApplicant} />}
        </>
      )}
      {!team && <div>팀을 선택해주세요</div>}
    </Stack>
  )
}

export default TeamsSetupPage
