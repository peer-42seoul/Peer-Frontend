'use client'

import {
  Box,
  Button,
  Checkbox,
  Container,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import MessageForm from './MessageForm'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'

const TeamList = ({ setTeamListStatus }: any) => {
  const { data, error, isLoading } = useSWR(
    `http://localhost:4000/team_list`,
    defaultGetFetcher,
  )
  if (error) return <Box>팀원 목록 불러오기를 실패하였습니다.</Box>
  if (!data) return <Box>빈 팀원 목록 입니다.</Box>
  if (isLoading) return <Box>팀원 목록을 불러오는 중입니다...</Box>

  return (
    <Container>
      <Box>
        {data.map((team: any, idx: number) => {
          return (
            <Box key={idx}>
              <Typography>{team.teamName}</Typography>
              {team.teamUserInfo.map((user) => {
                return (
                  <Box
                    key={user.id}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Checkbox />
                    <Typography key={user.id}>{user.username}</Typography>
                  </Box>
                )
              })}
            </Box>
          )
        })}
      </Box>
      <Box>
        <Button onClick={() => setTeamListStatus(false)}>닫기</Button>
        <Button>확인</Button>
      </Box>
    </Container>
  )
}

const MessageWritingForm = () => {
  const [nickname, setNickname] = useState('')
  const [teamListStatus, setTeamListStatus] = useState(false)

  const getTeamList = () => {
    setTeamListStatus(!teamListStatus)
  }
  return (
    <>
      {teamListStatus ? (
        <TeamList
          teamListStatus={teamListStatus}
          setTeamListStatus={setTeamListStatus}
        />
      ) : (
        <Container>
          <Box>
            <Box>
              <Typography>받는 사람</Typography>
              <Button onClick={getTeamList}>팀 리스트</Button>
            </Box>
            <TextField
              value={nickname}
              label="받는 사람"
              variant="outlined"
              onChange={(e) => setNickname(e.target.value)}
            />
          </Box>
          <MessageForm type={'newMessage'} nickname={nickname} />
        </Container>
      )}
    </>
  )
}

export default MessageWritingForm
