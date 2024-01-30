import React from 'react'
import { Stack, Typography } from '@mui/material'
import * as style from './TeamName.style'

interface IteamNameProps {
  teamName: string
}
const TeamName = ({ teamName }: IteamNameProps) => {
  return (
    <Stack sx={style.teamNameBox}>
      <Typography variant={'Body2'} color={'text.normal'} sx={style.teamName}>
        {teamName}
      </Typography>
    </Stack>
  )
}

export default TeamName
