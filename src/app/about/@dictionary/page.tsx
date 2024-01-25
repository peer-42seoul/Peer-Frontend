import { Card, Stack, Typography } from '@mui/material'

const DictionaryPage = () => {
  return (
    <Card sx={{ padding: '2rem' }}>
      <Stack>
        <Typography variant="Title2">Peer 개발백서 게시판</Typography>
      </Stack>
      <br />
      <Stack>
        <Card
          sx={{
            boxShadow: 'none',
            backgroundColor: 'background.secondary',
            padding: '0.5rem',
          }}
        >
          <Stack direction={'row'} spacing={'1rem'}>
            {/* <img src="/images/peer.png" width={100} height={130} alt="peer" /> */}
            <Stack spacing={'0.3rem'}>
              <Typography variant="Title1Emphasis">
                Front, Back, Designer - 피어 개발백서
              </Typography>
              <Typography variant="caption">공개일</Typography>
              <Typography variant="caption">
                개발진 1기의 최초의 Peer 제작의 기록을 여러분에게 공유드립니다.
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Card>
  )
}

export default DictionaryPage
