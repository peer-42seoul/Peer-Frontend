import { Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import Link from 'next/link'

import { IJob } from '@/types/IJob'
import dayjs from 'dayjs'

const JobCard = ({ title, writerName, createdAt, id }: IJob) => {
  return (
    <Card
      sx={{
        borderRadius: '0.75rem',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'background.tertiary',
        boxShadow: 'none',
      }}
    >
      <CardHeader
        title={
          <Typography
            variant="Body2"
            color="text.alternative"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {writerName}
          </Typography>
        }
      />
      <Link href={`/job/${id}`} style={{ textDecoration: 'none' }}>
        <CardContent
          sx={{
            '&:last-child': {
              paddingBottom: '1rem !important',
            },
            paddingY: 0,
          }}
        >
          <Stack>
            <Typography
              variant="Body1"
              color="text.normal"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {title}
            </Typography>
            <Typography variant="Body2" color="text.alternative">
              {dayjs(createdAt).format('YYYY-MM-DD')}
            </Typography>
          </Stack>
        </CardContent>
      </Link>
    </Card>
  )
}

export default JobCard
