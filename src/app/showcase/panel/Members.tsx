import CuAvatar from '@/components/CuAvatar'
import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'

const VacancyProfile = () => {
  return (
    <Avatar
      sx={{
        width: '1.5rem',
        height: '1.5rem',
        backgroundColor: 'text.assistive',
        color: 'text.alternative',
        borderWidth: '0.125rem',
        borderColor: 'line.base',
        borderStyle: 'solid',
        position: 'relative',
      }}
    >
      <Typography
        variant="Tag"
        color={'text.alternative'}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
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
  members: Array<{ url: string }>
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
                src={member.url}
                sx={{
                  width: '1.5rem',
                  height: '1.5rem',
                  backgroundColor: 'text.assistive',
                  color: 'text.alternative',
                  borderWidth: '0.125rem',
                  borderColor: 'line.base',
                  borderStyle: 'solid',
                  position: 'relative',
                }}
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
