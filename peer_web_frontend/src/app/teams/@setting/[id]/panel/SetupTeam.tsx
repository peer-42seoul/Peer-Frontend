'use client'

import {
  Box,
  SelectChangeEvent,
  Stack,
  Typography,
  Button,
} from '@mui/material'
import { ITeam } from '../page'
import { useState } from 'react'
import SetupSelect from './SetupSelect'
import axios from 'axios'
import useShowTeamCategory from '@/states/useShowTeamCategory'

const SetupTeam = ({ team }: { team: ITeam }) => {
  const [teamInfo, setTeamInfo] = useState(team)
  const { setShowTeamPageCategory } = useShowTeamCategory()

  const sendTeamInfo = () => {
    axios
      .post(
        'https://21bf1e8a-2c5e-466f-8261-fa05ad3bde03.mock.pstmn.io/api/v1/team/setting/1',
        teamInfo,
      )
      // .post(`/api/v1/team/setting/${team.team.id}`, teamInfo)
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
        operationForm: event.target.value,
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

  return (
    <Box sx={{ border: '1px solid', borderRadius: 2, p: 2 }}>
      <Typography fontWeight="bold">클릭한 프로젝트명 팀 설정 : </Typography>
      <Box sx={{ border: '1px solid', borderRadius: 2, m: 1, p: 2 }}>
        <Typography>{team.team.type}</Typography>
        <Typography>프로젝트명: {team.team.name}</Typography>

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
