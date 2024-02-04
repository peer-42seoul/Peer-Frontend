import React from 'react'
import { IconButton, Stack, Typography } from '@mui/material'
import * as style from './TeamName.style'
import { EditIcon } from '@/icons'
import { useRouter } from 'next/navigation'

interface IteamNameProps {
  teamName: string
  author?: boolean
  postId?: number
  editMode: boolean
}
const TeamName = ({ teamName, author, postId, editMode }: IteamNameProps) => {
  const router = useRouter()
  return (
    <Stack sx={style.teamNameBox}>
      <Typography variant={'Title3Emphasis'} color={'text.normal'}>
        {teamName}
      </Typography>
      {author && !editMode && (
        <IconButton
          onClick={() => router.push(`/showcase/edit?showcaseId=${postId}`)}
        >
          <EditIcon />
        </IconButton>
      )}
    </Stack>
  )
}

export default TeamName
