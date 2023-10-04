'use client'

import { Box, Button, TextField, Typography } from '@mui/material'
import RowRadioButtonsGroup from './panel/radioGroup'
import CommunicationToolLink from './panel/CommunicationToolLink'
import SetTeamRole from './panel/SetTeamRole'
import TagAutoComplete from './panel/TagAutoComplete'
import { useState } from 'react'
import BasicSelect, { ComponentType } from './panel/BasicSelect'
import WorkWeekend from './panel/WorkWeekend'

const CreateTeam = () => {
  const [tagData, setTagData] = useState<string[]>([])
  const [area, setArea] = useState<string>('')
  const [month, setMonth] = useState<string>('')
  const [teamsize, setTeamsize] = useState<string>('')
  const stackList = ['javaScript', 'react', 'TypeScript', 'NextJs']

  return (
    <>
      <Box>
        <Typography variant="h3">모집 글 쓰기</Typography>
        <Box>
          <Typography variant="h6">팀 제목</Typography>
          <TextField variant="outlined" />
        </Box>
        <Box>
          <Typography variant="h6">팀 분류</Typography>
          <RowRadioButtonsGroup />
        </Box>
        <Box>
          <Typography variant="h6">팀 인원</Typography>
          <BasicSelect
            type={ComponentType.TeamSize}
            value={teamsize}
            setValue={setTeamsize}
          />
        </Box>
        <Box>
          <Typography variant="h6">목표기간</Typography>
          <BasicSelect
            type={ComponentType.Month}
            value={month}
            setValue={setMonth}
          />
        </Box>
        <Box>
          <Typography variant="h6">지역</Typography>
          <BasicSelect
            type={ComponentType.Area}
            value={area}
            setValue={setArea}
          />
        </Box>
        <Box>
          <Typography variant="h6">커뮤니케이션 툴 링크</Typography>
          <CommunicationToolLink />
        </Box>
        <Box>
          <Typography variant="h6">모집인원 인터뷰 등록하기</Typography>
          <Button variant="contained">등록</Button>
        </Box>
        <Box>
          <Typography variant="h6">태그</Typography>
          <TagAutoComplete
            list={stackList}
            datas={tagData}
            setData={setTagData}
          />
        </Box>
        <Box>
          <WorkWeekend />
        </Box>
        <Box>
          <Typography variant="h6">팀 역할</Typography>
          <SetTeamRole />
        </Box>
        <Box>
          <Typography variant="h6">팀 소개</Typography>
          <TextField
            variant="outlined"
            sx={{ width: '80vw', height: 'auto' }}
          />
        </Box>
        <Button variant="contained" color="success">
          작성 완료
        </Button>
      </Box>
    </>
  )
}

export default CreateTeam
