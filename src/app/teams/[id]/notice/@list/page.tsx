'use client'
import { useState } from 'react'
import { Typography, Stack } from '@mui/material'
import {
  ListPageContainer,
  ListBoxContainer,
  NewPostButton,
  IconButtonContainer,
} from '@/components/board/ListPanel'
import useMedia from '@/hook/useMedia'
import useTeamPageState from '@/states/useTeamPageState'
import NoticeList from './panel/NoticeList'

const TeamNotice = ({ params }: { params: { id: string } }) => {
  const { id: teamId } = params
  const { isPc } = useMedia()
  const { setNotice } = useTeamPageState()
  const [keyword, setKeyword] = useState<string>('')

  return (
    <ListPageContainer>
      <NewPostButton
        onClick={() => {
          setNotice('EDIT')
        }}
      />
      <ListBoxContainer>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Typography variant={isPc ? 'Title3Emphasis' : 'Body1Emphasis'}>
            공지사항
          </Typography>
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
