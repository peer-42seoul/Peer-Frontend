import { Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const ProfileSection = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <Typography>{title}</Typography>
        <Link href={'profile/my-profile-setting'}>
          <Typography>수정</Typography>
        </Link>
      </Stack>
      {children}
    </div>
  )
}

export default ProfileSection
