import { Card, Stack, Typography } from '@mui/material'

const PeerPage = () => {
  return (
    <Card sx={{ padding: '2rem' }}>
      <Stack>
        <Typography variant="Title2">Peer는 어떤 커뮤니티인가</Typography>
        <Typography variant="Caption">생성일자</Typography>
        <Typography variant="Caption">수정일자</Typography>
      </Stack>
      <br />
      <Stack>
        <Card
          sx={{
            boxShadow: 'none',
            backgroundColor: 'background.secondary',
            padding: '1rem',
          }}
        >
          <Typography>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
            corporis vero ea nemo laboriosam saepe magni, a minus ipsam eaque
            eligendi molestiae dolores, quibusdam voluptatibus. Blanditiis nihil
            illo saepe mollitia? Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Quas corporis vero ea nemo laboriosam saepe magni,
            a minus ipsam eaque eligendi molestiae dolores, quibusdam
            voluptatibus. Blanditiis nihil illo saepe mollitia? Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Quas corporis vero ea
            nemo laboriosam saepe magni, a minus ipsam eaque eligendi molestiae
            dolores, quibusdam voluptatibus. Blanditiis nihil illo saepe
            mollitia? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Quas corporis vero ea nemo laboriosam saepe magni, a minus ipsam
            eaque eligendi molestiae dolores, quibusdam voluptatibus. Blanditiis
            nihil illo saepe mollitia?
          </Typography>
        </Card>
      </Stack>
    </Card>
  )
}

export default PeerPage
