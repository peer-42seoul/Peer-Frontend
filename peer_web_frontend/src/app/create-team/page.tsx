'use client'

import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import RowRadioButtonsGroup from './radioGroup'
import BasicSelectTeamSize from './BasicSelectTeamSize'
import BasicSelectMonth from './BasicSelectMonth'
import BasicSelectArea from './BasicSelectArea'

const CreateTeam = () => {
  return (
    <>
      <Box>
        <Typography>모집 글 쓰기</Typography>
        <Box>
          <Typography>팀 제목</Typography>
          <TextField id="outlined-password-input" variant="outlined" />
        </Box>
        <Box>
          <Typography>팀 분류</Typography>
          <RowRadioButtonsGroup />
        </Box>
        <Box>
          <Typography>팀 인원</Typography>
          <BasicSelectTeamSize />
        </Box>
        <Box>
          <Typography>목표기간</Typography>
          <BasicSelectMonth />
        </Box>
        <Box>
          <Typography>지역</Typography>
          <BasicSelectArea />
        </Box>
        <Box>
          <Typography>소통 링크</Typography>
        </Box>
        <Box>
          <Typography>태그</Typography>
        </Box>
        <Box>
          <Typography>투자 시간</Typography>
        </Box>
        <Button variant="contained" color="success">
          작성 완료
        </Button>
      </Box>
    </>
  )
}

export default CreateTeam
