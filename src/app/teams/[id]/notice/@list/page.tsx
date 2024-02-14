'use client'
import { useState } from 'react'
import { Typography, Stack } from '@mui/material'
import {
  ListPageContainer,
  ListBoxContainer,
  NewPostButton,
  TopPageButton,
  IconButtonContainer,
} from '@/components/board/ListPanel'
import useMedia from '@/hook/useMedia'
import useTeamPageState from '@/states/useTeamPageState'
import NoticeList from './panel/NoticeList'
import Tutorial from '@/components/Tutorial'
import TeamAnnounceTutorial from '@/components/tutorialContent/TeamAnnounceTutorial'

const TeamNotice = ({ params }: { params: { id: string } }) => {
  const { id: teamId } = params
  const { isPc } = useMedia()
  const { setNotice } = useTeamPageState()
  const [keyword, setKeyword] = useState<string>('')

  return (
    <ListPageContainer>
      <TopPageButton>
        <NewPostButton onClick={() => setNotice('EDIT')} />
      </TopPageButton>
      <ListBoxContainer>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Stack direction={'row'} display={'flex'} alignItems={'center'}>
            <Typography variant={isPc ? 'Title3Emphasis' : 'Body1Emphasis'}>
              공지사항
            </Typography>
            <Tutorial
              title={'팀 공지사항'}
              content={<TeamAnnounceTutorial />}
            />
          </Stack>
          <IconButtonContainer
            setKeyword={setKeyword}
            onClickPlus={() => {
              setNotice('EDIT')
            }}
          />
        </Stack>
        <NoticeList teamId={parseInt(teamId)} keyword={keyword} />
      </ListBoxContainer>
    </ListPageContainer>
  )
}

export default TeamNotice
