import {
  Card,
  CardActionArea,
  CardActions,
  Stack,
  Typography,
} from '@mui/material'

//TODO: 페이지네이션

interface NoticeCardProps {
  title: string
  writer: string
  date: string
}

const NoticeCard = ({ title, writer, date }: NoticeCardProps) => {
  return (
    <CardActions
      sx={{
        boxShadow: 'none',
        backgroundColor: 'background.secondary',
        padding: '0.5rem',
      }}
    >
      <CardActionArea
        sx={{
          '.MuiCardActionArea-focusHighlight': {
            background: 'transparent',
          },
        }}
      >
        <Typography>{title}</Typography>
        <Stack spacing={'0.5rem'} direction={'row'}>
          <Typography variant="caption">{writer}</Typography>
          <Typography variant="caption">{date}</Typography>
        </Stack>
      </CardActionArea>
    </CardActions>
  )
}

const mockData = [
  {
    title: '공지사항 제목',
    writer: '작성자',
    date: '2021.10.10',
  },

  {
    title: '공지사항 제목',
    writer: '작성자',
    date: '2021.10.10',
  },

  {
    title: '공지사항 제목',
    writer: '작성자',
    date: '2021.10.10',
  },

  {
    title: '공지사항 제목',
    writer: '작성자',
    date: '2021.10.10',
  },
]

const NoticePage = () => {
  return (
    <Card sx={{ padding: '2rem' }}>
      <Stack>
        <Typography variant="Title2">공지사항</Typography>
      </Stack>
      <br />
      <Stack spacing={'1rem'}>
        {mockData.map((data, index) => (
          <NoticeCard
            key={data.title + index}
            title={data.title}
            writer={data.writer}
            date={data.date}
          />
        ))}
      </Stack>
    </Card>
  )
}

export default NoticePage
