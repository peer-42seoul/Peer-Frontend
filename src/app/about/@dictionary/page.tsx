import { Card, Stack, Typography } from '@mui/material'

const DictionaryPage = () => {
  return (
    <Card sx={{ padding: '2rem' }}>
      <Stack>
        <Typography variant="Title2">Peer는 어떤 커뮤니티인가</Typography>
        <Typography>생성 일자</Typography>
      </Stack>
      <Stack>
        <Card variant="outlined" sx={{ boxShadow: 'none' }}>
          <Typography>커뮤니티 소개</Typography>
        </Card>
      </Stack>
    </Card>
  )
}

export default DictionaryPage
