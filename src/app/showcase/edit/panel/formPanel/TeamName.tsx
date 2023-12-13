import React from 'react'
import { Avatar, Stack, Typography } from '@mui/material'
import LabelWithIcon from '../LabelWithIcon'
import { ListIcon } from '../icons'
import * as Style from '../ShowcaseEditor.style'

const TeamName = () => {
  return (
    <Stack direction={'column'} spacing={'0.5rem'}>
      <LabelWithIcon
        svgIcon={<ListIcon sx={Style.IconStyle} />}
        message="프로젝트 팀명"
      />
      <Stack direction={'row'} spacing={'6px'} alignItems={'center'}>
        <Avatar src={''} sx={{ width: '2rem', height: '2rem' }} />
        <Typography variant={'Body2'}>프로젝트명 피어</Typography>
      </Stack>
    </Stack>
  )
}

export default TeamName
