'use client'

import { IconButton, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Job, TeamStatus } from '@/app/teams/types/types'
import useAxiosWithAuth from '@/api/config'

interface NewJob {
  name: string
  max: number
}

interface Props {
  onNewJob: (newJob: Job) => void
  teamId: string
  teamStatus: TeamStatus
}

const AddNewJob = ({ onNewJob, teamId, teamStatus }: Props) => {
  const axiosWithAuth = useAxiosWithAuth()
  const [newJob, setNewJob] = useState<NewJob>({
    name: '',
    max: 1,
  })

  const increaseNumber = () => setNewJob({ ...newJob, max: newJob.max + 1 })

  const decreaseNumber = () => {
    if (newJob.max === 1) return
    setNewJob({ ...newJob, max: newJob.max - 1 })

    // onNewJob(newJob)
  }

  const handleAddJob = () => {
    axiosWithAuth
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/setting/job/add/${teamId}`,
        newJob,
      )
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          console.log(res.data)
          onNewJob(res.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      px={'2rem'}
      paddingTop={'1rem'}
    >
      <TextField
        disabled={teamStatus === TeamStatus.COMPLETE ? true : false}
        value={newJob.name}
        onChange={(e) => setNewJob({ ...newJob, name: e.target.value })}
        placeholder="추가할 직업군을 입력하세요."
        sx={{ width: '20rem' }}
      />
      <Stack direction={'row'} alignItems={'center'}>
        <IconButton
          onClick={decreaseNumber}
          disabled={teamStatus === TeamStatus.COMPLETE ? true : false}
        >
          <RemoveIcon color="primary" />
        </IconButton>
        <Typography>{newJob.max}</Typography>
        <IconButton
          onClick={increaseNumber}
          disabled={teamStatus === TeamStatus.COMPLETE ? true : false}
        >
          <AddIcon color="primary" />
        </IconButton>
      </Stack>
      <Stack direction={'row'} alignItems={'center'}>
        <IconButton
          onClick={handleAddJob}
          disabled={teamStatus === TeamStatus.COMPLETE ? true : false}
        >
          <Typography>추가</Typography>
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default AddNewJob
