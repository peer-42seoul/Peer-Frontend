'use client'

import {
  Box,
  SelectChangeEvent,
  Stack,
  Typography,
  Button,
  TextField,
} from '@mui/material'
import { ITeam, TeamOperationForm } from '../page'
import { ChangeEvent, useState } from 'react'
import SetupSelect from './SetupSelect'
import axios from 'axios'
import useShowTeamCategory from '@/states/useShowTeamCategory'
import Image from 'next/image'

const SetupTeam = ({ team }: { team: ITeam }) => {
  const [teamInfo, setTeamInfo] = useState(team)
  const { setShowTeamPageCategory } = useShowTeamCategory()

  const sendTeamInfo = () => {
    console.log(teamInfo)
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/setting/${team.team.id}`,
        teamInfo,
      )
      .then((res) => {
        if (res.status == 200) {
          console.log('서버에 저장 완료')
          setShowTeamPageCategory('메인')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleLocation1 = (event: SelectChangeEvent) => {
    setTeamInfo({
      ...teamInfo,
      team: {
        ...teamInfo.team,
        region: [
          event.target.value,
          teamInfo.team.region[1],
          teamInfo.team.region[2],
        ],
      },
    })
  }

  const handleLocation2 = (event: SelectChangeEvent) => {
    setTeamInfo({
      ...teamInfo,
      team: {
        ...teamInfo.team,
        region: [
          teamInfo.team.region[0],
          event.target.value,
          teamInfo.team.region[2],
        ],
      },
    })
  }

  const handleLocation3 = (event: SelectChangeEvent) => {
    setTeamInfo({
      ...teamInfo,
      team: {
        ...teamInfo.team,
        region: [
          teamInfo.team.region[0],
          teamInfo.team.region[1],
          event.target.value,
        ],
      },
    })
  }

  const handleOperationForm = (event: SelectChangeEvent) => {
    setTeamInfo({
      ...teamInfo,
      team: {
        ...teamInfo.team,
        operationForm: event.target.value as TeamOperationForm,
      },
    })
  }

  const handleDate = (event: SelectChangeEvent) => {
    setTeamInfo({
      ...teamInfo,
      team: {
        ...teamInfo.team,
        dueTo: event.target.value,
      },
    })
  }

  const handleTeamName = (event: ChangeEvent<HTMLInputElement>) => {
    setTeamInfo({
      ...teamInfo,
      team: {
        ...teamInfo.team,
        name: event.target.value,
      },
    })
  }

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return alert('파일이 없습니다.')
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
  }

  const validation = () => {
    let check =
      /[~!@#$%^&*()_+|<>?:{}.,/;='"ㄱ-ㅎ | ㅏ-ㅣ | 가-힣 | a-z | A-Z ]/
    return check.test(teamInfo.team.name)
  }

  return (
    <Box sx={{ border: '1px solid', borderRadius: 2, p: 2 }}>
      <Typography fontWeight="bold">클릭한 프로젝트명 팀 설정 : </Typography>
      <Box sx={{ border: '1px solid', borderRadius: 2, m: 1, p: 2 }}>
        <Stack>
          <Typography>{team.team.type}</Typography>
          <Stack direction="row" justifyContent={'space-between'}>
            <Typography>
              {team.team.type}명: {team.team.name}
            </Typography>

            <TextField
              id="outlined-basic"
              label={`${team.team.type} 이름`}
              variant="outlined"
              value={teamInfo.team.name}
              maxRows={1}
              size="small"
              onChange={handleTeamName}
              error={validation()}
              helperText={validation() ? '다시 입력' : ''}
              inputProps={{
                style: {
                  padding: 5,
                },
              }}
            />
          </Stack>
          <Stack>
            <Image
              src={
                teamInfo.team.imageUrl
                  ? teamInfo.team.imageUrl
                  : '/images/teamLogo.png'
              }
              alt="teamLogo"
              width={100}
              height={100}
            />
            <input type="file" accept="image/*" onChange={handleImage} />

            <Stack direction="row" justifyContent={'space-between'}>
              <Typography>팀명: {team.team.name}</Typography>

              <TextField
                id="outlined-basic"
                label={`팀 이름`}
                variant="outlined"
                value={teamInfo.team.name}
                maxRows={1}
                size="small"
                onChange={handleTeamName}
                error={validation()}
                helperText={validation() ? '다시 입력' : ''}
                inputProps={{
                  style: {
                    padding: 5,
                  },
                }}
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Typography>목표 기간: </Typography>
          <SetupSelect
            type="dueTo"
            value={teamInfo.team.dueTo}
            setValue={handleDate}
          />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography>활동 방식: </Typography>
          <SetupSelect
            type="operationForm"
            value={teamInfo.team.operationForm}
            setValue={handleOperationForm}
          />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography>팀 활동 지역: </Typography>
          <Stack direction="row" spacing={1}>
            <SetupSelect
              type="location"
              value={teamInfo.team.region[0]}
              setValue={handleLocation1}
            />
            <SetupSelect
              type="location"
              value={teamInfo.team.region[1]}
              setValue={handleLocation2}
            />
            <SetupSelect
              type="location"
              value={teamInfo.team.region[2]}
              setValue={handleLocation3}
            />
          </Stack>
        </Stack>
      </Box>
      <Button onClick={sendTeamInfo}>팀 설정</Button>
    </Box>
  )
}

export default SetupTeam
