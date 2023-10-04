'use client'

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  Button,
  MenuItem,
} from '@mui/material'
import { ITeam } from '../[id]/page'
import { useState } from 'react'

const SetupTeam = ({ team }: { team: ITeam }) => {
  const [location, setLocation] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string)
  }

  return (
    <Box sx={{ border: '1px solid', borderRadius: 2, p: 2 }}>
      <Typography fontWeight="bold">클릭한 프로젝트명 팀 설정 : </Typography>
      <Box sx={{ border: '1px solid', borderRadius: 2, m: 1, p: 2 }}>
        <Stack direction="row" spacing={2}>
          <Typography>{team.team.type}</Typography>
          <Typography>프로젝트명: {team.team.name}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography>목표 기간: {team.team.dueTo}</Typography>
          <Typography>활동 방식: {team.team.operationForm}</Typography>
        </Stack>
        <Stack direction="column" spacing={2}>
          <Typography>팀 활동 지역: </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">지역</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={location}
              label="지역"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'서울'}>서울</MenuItem>
              <MenuItem value={'부산'}>부산</MenuItem>
              <MenuItem value={'판교'}>판교</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>
      <Button>팀 설정</Button>
    </Box>
  )
}

export default SetupTeam
