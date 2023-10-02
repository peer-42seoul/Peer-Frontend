import { Box, Stack, Typography } from '@mui/material'

const SetupPage = () => {
  return (
    <Box sx={{ border: '1px solid', borderRadius: 2, p: 2 }}>
      <Typography>클릭한 프로젝트명 팀 설정 : </Typography>
      <Box sx={{ border: '1px solid', borderRadius: 2, m: 1, p: 2 }}>
        <Typography>팀 상태</Typography>
        <Stack direction="row" spacing={2}>
          <Typography>스터디</Typography>
          <Typography>프로젝트명</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography>목표 기간</Typography>
          <Typography>팀 최대 인원</Typography>
          <Typography>활동 방식</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography>팀 활동 지역</Typography>
        </Stack>
      </Box>
    </Box>
  )
}

export default SetupPage
