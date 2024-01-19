import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import LabelWithIcon from '../LabelWithIcon'
import ListIcon from '@/icons/ListIcon'
import * as Style from './SkillInput.style'
import { IMember } from '@/types/IShowcaseEdit'

const MemberInformation = ({ member }: { member: IMember }) => {
  return (
    <Stack direction={'row'} sx={{ alignItems: 'center' }}>
      <Avatar src={member.image} sx={{ width: '2rem', height: '2rem' }} />
      <Typography variant={'Body2'}>{member.nickname}</Typography>
      <Typography variant={'Body2'}>{member.role}</Typography>
    </Stack>
  )
}

const TeamMembers = ({ members }: { members: IMember[] }) => {
  return (
    <Stack direction={'column'} spacing={'0.5rem'}>
      <LabelWithIcon
        svgIcon={<ListIcon sx={Style.IconStyle} />}
        message="팀구성"
      />
      <Stack direction={'column'} spacing={'6px'}>
        {members?.map((member, index) => (
          <MemberInformation key={index} member={member} />
        ))}
      </Stack>
    </Stack>
  )
}

export default TeamMembers
