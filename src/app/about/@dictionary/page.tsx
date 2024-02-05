import { Button, Card, Stack, Typography } from '@mui/material'
import Image from 'next/image'

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
            <Stack spacing={'0.3rem'} direction={'row'}>
              <Button href="/pdf/peer-01.pdf">
                <Image
                  src="/images/peer-thumbnail.png"
                  width={200}
                  height={300}
                  alt="peer"
                />
              </Button>
              <Stack py={'3rem'} px={'2rem'}>
                <Typography variant="Title1Emphasis">
                  Front, Back, Designer - 피어 개발백서
                </Typography>
                <Typography variant="Caption">
                  공개일: 2024년 2월 5일
                </Typography>
                <br />
                <Typography variant="Body1">
                  개발진 1기의 최초의 Peer 제작의 기록을 여러분에게
                  공유드립니다.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Card>
  )
}

export default DictionaryPage
