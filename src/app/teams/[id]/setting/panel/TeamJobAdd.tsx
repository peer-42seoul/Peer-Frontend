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

interface TableColumn {
  id: string
  label: string
  minWidth: number
}

const tableColumn: TableColumn[] = [
  { id: 'name', label: '역할 이름', minWidth: 170 },
  { id: 'current', label: '현재 인원', minWidth: 100 },
  { id: 'max', label: '최대 인원', minWidth: 100 },
  { id: 'delete', label: '', minWidth: 100 },
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
    if (jobs.find((job) => job.id === id)?.current !== 0)
      return alert('현재 인원이 0명이 아닌 직군은 삭제할 수 없습니다.')
    setJobs(jobs.filter((job) => job.id !== id))
  }

  const handleAddNewJob = (newJob: Job) => {
    setJobs([...jobs, newJob])
  }

  return (
    <Card sx={{ p: '1.5rem', borderRadius: '1rem' }}>
      <Stack spacing={2}>
        <Typography>역할 추가</Typography>
        <Card
          sx={{
            p: 2,
            borderRadius: '1rem',
            backgroundColor: (theme: Theme) =>
              theme.palette.background.tertiary,
          }}
        >
          <TableContainer
            component={Paper}
            sx={{ overflowX: 'auto', height: '18rem' }}
          >
            <Table sx={{ minWidth: '25rem' }} stickyHeader>
              <TableHead>
                <TableRow>
                  {tableColumn.map((column) => (
                    <TableCell
                      key={column.id}
                      align="center"
                      sx={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell component={'th'} scope="row" align="center">
                      {job.name}
                    </TableCell>
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
