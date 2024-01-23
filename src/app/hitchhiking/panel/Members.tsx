import CuAvatar from '@/components/CuAvatar'
import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import * as style from './Members.style'
import { centeredPosition } from '@/constant/centerdPosition.style'

const VacancyProfile = () => {
  return (
    <Avatar sx={style.vacancyAvatarStyle}>
      <Typography
        variant="Tag"
        color={'text.alternative'}
        sx={centeredPosition}
      >
        ?
      </Typography>
    </Avatar>
  )
}

const Members = ({
  members,
  recruitmentQuota,
}: {
  members: Array<string | null>
  recruitmentQuota: number
}) => {
  const vacancies = []
  for (
    let i = 0;
    i < recruitmentQuota - members.length && i < 6 && i < recruitmentQuota;
    i++
  ) {
    vacancies.push(<VacancyProfile key={i} />)
  }

  return (
    <Stack direction={'row'} spacing={'0.25rem'} alignItems={'center'}>
      <Stack direction={'row'} spacing={'-0.4rem'} alignItems={'center'}>
        {vacancies.length > 0 && vacancies}
        {vacancies.length < 6 &&
          members.map((member, idx) => {
            if (idx + vacancies.length > 6) return null
            return (
              <CuAvatar
                key={idx}
                src={member ?? undefined}
                sx={style.avatarStyle}
              />
            )
          })}
      </Stack>
      {recruitmentQuota > 6 && (
        <Typography variant="Tag" color={'text.alternative'}>
          {`+${recruitmentQuota - 6}`}
        </Typography>
      )}
    </Stack>
  )
}

export default Members
