import { Stack, Typography } from '@mui/material'
import React from 'react'
import LabelWithIcon from '../../../../components/LabelWithIcon'
import ListIcon from '@/icons/ListIcon'
import * as Style from './SkillInput.style'
import { IMember } from '@/types/IShowcaseEdit'
import CuAvatar from '@/components/CuAvatar'

const MemberInformation = ({ member }: { member: IMember }) => {
  return (
    <Stack
      direction={'row'}
      gap={'0.38rem'}
      sx={{ alignItems: 'center' }}
      width={'auto'}
      height={'auto'}
    >
      <CuAvatar
        src={member.image}
        sx={{ width: '1.75rem', height: '1.75rem', border: '1px solid 2C2E35' }}
      />
      <Typography variant={'Body2'} sx={{ color: 'text.normal' }}>
        {member.nickname}
      </Typography>
      {member.isLeader && (
        <Typography variant={'Body2'} sx={{ color: 'purple.strong' }}>
          리더
        </Typography>
      )}
      <Typography variant={'CaptionEmphasis'} sx={{ color: 'purple.strong' }}>
        {member.role}
      </Typography>
    </Stack>
  )
}

const TeamMembers = ({ members }: { members: IMember[] }) => {
  return (
    <Stack direction={'column'} spacing={'0.75rem'}>
      <LabelWithIcon
        svgIcon={<ListIcon sx={Style.IconStyle} />}
        message="팀구성"
        color="text.alternative"
      />
      <Stack
        direction={'column'}
        spacing={'0.5rem'}
        width={'100%'}
        height={'auto'}
      >
        {members?.map((member, index) => (
          <MemberInformation key={index} member={member} />
        ))}
      </Stack>
    </Stack>
  )
}

export default TeamMembers
