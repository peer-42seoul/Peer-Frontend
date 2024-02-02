import React from 'react'
import { IconButton, Stack, Typography } from '@mui/material'
import * as style from './TeamName.style'
import { EditIcon } from '@/icons'
import { useRouter } from 'next/navigation'

interface IteamNameProps {
  teamName: string
  author: boolean
  postId: number
}
const TeamName = ({ teamName, author, postId }: IteamNameProps) => {
  const router = useRouter()
  console.log('showcaseId', postId)
  return (
    <Stack sx={style.teamNameBox}>
      <Typography variant={'Body2'} color={'text.normal'} sx={style.teamName}>
        {teamName}
      </Typography>
      <IconButton
        onClick={() => router.push(`/showcase/edit?showcaseId=${postId}`)}
        disabled={author}
        // router.push(`/showcase/edit?showcaseId=${showcaseId}`)
      >
        <EditIcon />
      </IconButton>
    </Stack>
  )
}

export default TeamName
