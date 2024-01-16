import {
  Card,
  CardActionArea,
  CardActions,
  Stack,
  Typography,
} from '@mui/material'

//TODO: 페이지네이션

const NoticePage = () => {
  return (
    <Card sx={{ padding: '2rem' }}>
      <Stack>
        <Typography variant="Title2">공지사항</Typography>
      </Stack>
      <br />
      <Stack>
        <CardActions
          sx={{
            boxShadow: 'none',
            backgroundColor: 'background.secondary',
            padding: '0.5rem',
          }}
        >
          <CardActionArea>
            <Typography>오픈 행사 스타트!!</Typography>
            <Stack spacing={'0.5rem'} direction={'row'}>
              <Typography variant="caption">주전</Typography>
              <Typography variant="caption">2024월 2월 1일</Typography>
            </Stack>
          </CardActionArea>
        </CardActions>
      </Stack>
    </Card>
  )
}

export default NoticePage
