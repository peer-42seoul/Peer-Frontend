'use client'

import {
  Card,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from '@mui/material'
import AddNewJob from './AddNewJob'
import { Job } from '@/app/teams/types/types'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useState } from 'react'

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
  {
    id: 3,
    name: '디자이너',
    current: 0,
    max: 1,
  },
  {
    id: 4,
    name: '기획자',
    current: 0,
    max: 1,
  },
]

interface Props {
  teamId: string
}

const TeamJobAdd = ({ teamId }: Props) => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs)
  const handleAdd = (id: number) => {
    console.log('add', id)
    setJobs(
      jobs.map((job) => (job.id === id ? { ...job, max: job.max + 1 } : job)),
    )
  }

  const handleRemove = (id: number) => {
    console.log('remove', id)
    if (jobs.find((job) => job.id === id)?.max === 1) return
    setJobs(
      jobs.map((job) => (job.id === id ? { ...job, max: job.max - 1 } : job)),
    )
  }

  const handleDelete = (id: number) => {
    if (jobs.length === 1) return alert('최소 한 개의 직군이 필요합니다.')
    console.log('delete', id)
    setJobs(jobs.filter((job) => job.id !== id))
  }

  const handleAddNewJob = (newJob: Job) => {
    setJobs([...jobs, newJob])
  }

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
          <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: '25rem' }} stickyHeader>
              <TableHead>
                <TableCell align="center">이름</TableCell>
                <TableCell align="center">현재 인원</TableCell>
                <TableCell align="center">최대 인원</TableCell>
                <TableCell align="center"></TableCell>
              </TableHead>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell align="center">{job.name}</TableCell>
                    <TableCell align="center">{job.current}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        sx={{ py: 0 }}
                        onClick={() => handleRemove(job.id)}
                      >
                        <RemoveIcon color="primary" />
                      </IconButton>
                      {job.max}
                      <IconButton
                        sx={{ py: 0 }}
                        onClick={() => handleAdd(job.id)}
                      >
                        <AddIcon color="primary" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        sx={{ py: 0 }}
                        onClick={() => handleDelete(job.id)}
                      >
                        <Typography>삭제</Typography>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <AddNewJob onNewJob={handleAddNewJob} teamId={teamId} />
        </Card>
      </Stack>
    </Card>
  )
}

export default TeamJobAdd
