'use client'

import { Card, IconButton, Stack, Theme, Typography } from '@mui/material'
import AddNewJob from './AddNewJob'
import { Job } from '@/app/teams/types/types'

const mockJobs: Job[] = [
  {
    id: 1,
    name: '프론트엔드',
    current: 2,
    max: 4,
  },
  {
    id: 2,
    name: '백엔드',
    current: 1,
    max: 2,
  },
]

const TeamJobAdd = () => {
  return (
    <Card sx={{ p: '1.5rem', borderRadius: '1rem' }}>
      <Stack spacing={2}>
        <Typography>팀원 추가</Typography>
        <Card
          sx={{
            p: 2,
            borderRadius: '1rem',
            backgroundColor: (theme: Theme) =>
              theme.palette.background.tertiary,
          }}
        >
          {mockJobs.map((job) => (
            <Stack
              key={job.id}
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography>{job.id}</Typography>
              <Typography>{job.name}</Typography>

              <Typography>{job.current}</Typography>

              <IconButton>
                <Typography>-</Typography>
              </IconButton>
              <Typography>{job.max}</Typography>
              <IconButton>
                <Typography>+</Typography>
              </IconButton>

              <IconButton>
                <Typography>삭제</Typography>
              </IconButton>
            </Stack>
          ))}
          <AddNewJob />
        </Card>
      </Stack>
    </Card>
  )
}

export default TeamJobAdd
