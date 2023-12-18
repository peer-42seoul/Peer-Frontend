'use client'

import { IconButton, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

interface NewJob {
  name: string
  current: number
  max: number
}

const AddNewJob = () => {
  const [newJob, setNewJob] = useState<NewJob>({
    name: '',
    current: 0,
    max: 1,
  })

  const increaseNumber = () => setNewJob({ ...newJob, max: newJob.max + 1 })

  const decreaseNumber = () => {
    if (newJob.max === 1) return
    setNewJob({ ...newJob, max: newJob.max - 1 })
  }

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <TextField sx={{ width: '20rem' }} />
      <Stack direction={'row'} alignItems={'center'}>
        <IconButton onClick={decreaseNumber}>
          <Typography>-</Typography>
        </IconButton>
        <Typography>{newJob.max}</Typography>
        <IconButton onClick={increaseNumber}>
          <Typography>+</Typography>
        </IconButton>
      </Stack>
      <Stack direction={'row'} alignItems={'center'}>
        <IconButton>
          <Typography>추가</Typography>
        </IconButton>

        <IconButton>
          <Typography>삭제</Typography>
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default AddNewJob
