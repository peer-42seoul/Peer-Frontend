import { Typography, Stack, Button } from '@mui/material'

const Sidebar = () => {
  return (
    <Stack spacing={3} sx={{ border: '1px solid', borderRadius: 2, p: 2 }}>
      <Button size="large">팀리스트(전체)</Button>
      <Stack sx={{ alignItems: 'center' }}>
        <Button>모집 중</Button>
        <Typography>▾</Typography>
        <Button>시작 전</Button>
        <Typography>▾</Typography>
        <Button>진행 중</Button>
        <Typography>▾</Typography>
        <Button>진행 완료</Button>
      </Stack>
    </Stack>
  )
}

export default Sidebar
