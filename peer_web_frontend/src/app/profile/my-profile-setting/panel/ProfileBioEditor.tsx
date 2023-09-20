'use client'
import React from 'react'
import SettingContainer from './SettingContainer'
import useSWR from 'swr'
import { Avatar, Stack } from '@mui/material'

const ProfileBioEditor = () => {
  const { data, error, isLoading } = useSWR('http://localhost:4000/profile/1')

  return (
    <SettingContainer
      onNegativeClick={() => console.log('on negative click')}
      onPositiveClick={() => console.log('on positive click')}
      settingTitle="introduction"
    >
      {!isLoading && !error && data && (
        <Stack>
          <Avatar src={data.profileImageUrl} />
        </Stack>
      )}
    </SettingContainer>
  )
}

export default ProfileBioEditor
