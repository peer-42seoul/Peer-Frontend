'use client'

import {
  Button,
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
  TextField,
  Theme,
  Typography,
} from '@mui/material'
import AddNewJob from './AddNewJob'
import { Job, TeamStatus } from '@/app/teams/types/types'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useEffect, useState } from 'react'
import CloseButton from '@/components/CloseButton'
import { SettingIcon } from '@/icons/TeamPage'
import useAxiosWithAuth from '@/api/config'
import Tutorial from '@/components/Tutorial'
import TeamJobsTutorial from '@/components/tutorialContent/TeamJobsTutorial'

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
  jobList: Job[]
  teamStatus: TeamStatus
}

const SettingTeamJobs = ({ teamId, jobList, teamStatus }: Props) => {
  const [jobs, setJobs] = useState<Job[]>(jobList)
  const [isSettingButton, setIsSettingButton] = useState('')
  const axiosWithAuth = useAxiosWithAuth()
  const [editJob, setEditJob] = useState<Job>({
    id: 0,
    name: '',
    max: 0,
    current: 0,
  })

  useEffect(() => {
    setJobs(jobList)
  }, [jobList])

  const handleDelete = (id: number) => {
    if (jobs.length === 1) return alert('최소 한 개의 직군이 필요합니다.')
    if (jobs.find((job) => job.id === id)?.current !== 0)
      return alert('현재 인원이 0명이 아닌 직군은 삭제할 수 없습니다.')
    setJobs(jobs.filter((job) => job.id !== id))
  }

  const handleAddNewJob = (newJob: Job) => {
    setJobs([...jobs, newJob])
  }

  const handleSettingButton = (name: string) => {
    if (isSettingButton === name) {
      setIsSettingButton('')
      setEditJob({ id: 0, name: '', max: 0, current: 0 })
    } else {
      setIsSettingButton(name)
      setEditJob(jobs.find((job) => job.name === name) as Job)
    }
  }

  const handleEditJob = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditJob({ ...editJob, name: e.target.value })
  }

  const minusEditJob = () => {
    if (editJob.max === 1) return
    setEditJob({ ...editJob, max: editJob.max - 1 })
  }

  const plusEditJob = () => {
    setEditJob({ ...editJob, max: editJob.max + 1 })
  }

  // const changeJob = () => {
  //   axiosWithAuth.put(
  //     `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/team/setting/job/change`,
  //     job,
  //   )
  // }

  const handleSave = () => {
    if (editJob.name === '') return alert('역할 이름을 입력해주세요.')
    if (jobs.find((job) => job.name === editJob.name)) {
      return alert('이미 존재하는 역할입니다.')
    }
    axiosWithAuth
      .put(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/team/setting/change`,
        editJob,
      )
      .then((res) => {
        if (res.status === 200) {
          console.log('역할 변경 완료')
          setJobs(
            jobs.map((job) =>
              job.id === editJob.id
                ? { ...job, name: editJob.name, max: editJob.max }
                : job,
            ),
          )
          setIsSettingButton('')
          setEditJob({ id: 0, name: '', max: 0, current: 0 })
        } else console.log(res.status)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Card sx={{ p: '1.5rem', borderRadius: '1rem' }}>
      <Stack spacing={2}>
        <Stack direction={'row'} display={'flex'} alignItems={'center'}>
          <Typography fontWeight="bold">역할 추가</Typography>
          <Tutorial title={'역할 추가'} content={<TeamJobsTutorial />} />
        </Stack>
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
                  <TableRow key={job.id} sx={{ height: '5rem' }}>
                    <TableCell component={'th'} scope="row" align="center">
                      {isSettingButton === job.name ? (
                        <TextField
                          onChange={handleEditJob}
                          value={editJob.name}
                        />
                      ) : (
                        <Typography fontSize={'large'} variant="body1">
                          {job.name}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontSize={'large'}>{job.current}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      {isSettingButton === job.name ? (
                        <Stack
                          direction={'row'}
                          spacing={1}
                          justifyContent={'center'}
                        >
                          <IconButton sx={{ py: 0 }} onClick={minusEditJob}>
                            <RemoveIcon sx={{ fontSize: 15 }} color="primary" />
                          </IconButton>
                          <Typography fontSize={'large'}>{job.max}</Typography>
                          <IconButton sx={{ py: 0 }} onClick={plusEditJob}>
                            <AddIcon sx={{ fontSize: 15 }} color="primary" />
                          </IconButton>
                        </Stack>
                      ) : (
                        <Typography fontSize={'large'}>{job.max}</Typography>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {isSettingButton === job.name ? (
                        <>
                          <Button onClick={handleSave}>저장</Button>
                          <Button onClick={() => handleSettingButton('')}>
                            취소
                          </Button>
                        </>
                      ) : (
                        <>
                          <IconButton
                            disabled={
                              teamStatus === TeamStatus.COMPLETE ? true : false
                            }
                            sx={{ p: 0, m: 0 }}
                            onClick={() => handleSettingButton(job.name)}
                          >
                            <SettingIcon
                              sx={{ fontSize: 15 }}
                              color="primary"
                            />
                          </IconButton>
                          <IconButton
                            sx={{ p: 0, m: 0 }}
                            onClick={() => handleDelete(job.id)}
                            disabled={
                              teamStatus === TeamStatus.COMPLETE ? true : false
                            }
                          >
                            <CloseButton style={{ fontSize: 15 }} />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <AddNewJob
            onNewJob={handleAddNewJob}
            teamId={teamId}
            teamStatus={TeamStatus.COMPLETE}
          />
        </Card>
      </Stack>
    </Card>
  )
}

export default SettingTeamJobs
