'use client'

import {
  Box,
  Button,
  Checkbox,
  Container,
  TextField,
  Typography,
} from '@mui/material'
import React, { useCallback, useState } from 'react'
import MessageForm from './MessageForm'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'
import CloseIcon from '@mui/icons-material/Close'

const TeamList = ({ setTeamListStatus }: any) => {
  const { data, error, isLoading } = useSWR(
    `http://localhost:4000/team_list`,
    defaultGetFetcher,
  )
  const [selectedMember, setSelectedMember] = useState([])

  const checkMemberHandler = useCallback(
    (event: any) => {
      const checked = event.target.checked
      const value = event.target.value

      if (checked) {
        setSelectedMember([...selectedMember, value])
      } else {
        setSelectedMember(selectedMember.filter((item) => item !== value))
      }
    },
    [selectedMember],
  )

  const toggleMemberHandler = useCallback((targetName: string) => {
    setSelectedMember((prevSelected) =>
      prevSelected.filter((item) => item !== targetName),
    )
  }, [])
  if (error) return <Box>팀원 목록 불러오기를 실패하였습니다.</Box>
  if (!data) return <Box>팀원 목록이 없습니다.</Box>
  if (isLoading) return <Box>팀원 목록을 불러오는 중입니다...</Box>

  return (
    <Container>
      <Box sx={{ display: 'flex' }}>
        {selectedMember.map((userName) => (
          <>
            <Typography key={userName}>{userName}</Typography>
            <Button onClick={() => toggleMemberHandler(userName)}>
              <CloseIcon />
            </Button>
          </>
        ))}
      </Box>
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
                    <Checkbox
                      value={user.username}
                      checked={selectedMember.includes(user.username)}
                      onClick={checkMemberHandler}
                    />
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

const MessageWritingForm = ({ isPc, handleClose }: any) => {
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
          <MessageForm
            type={'newMessage'}
            nickname={nickname}
            handleClose={handleClose}
            isPc={isPc}
          />
        </Container>
      )}
    </>
  )
}

export default MessageWritingForm
