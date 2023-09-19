import { Stack, Typography } from '@mui/material'
// import Link from 'next/link'
import React from 'react'
import ProfileSectionEditLink from './ProfileSectionEditLink'

const sectionType = {
  introduction: '소개',
  achievements: '업적',
  skills: '스킬',
  links: '링크',
}

const ProfileSection = ({
  sectionTitle,
  children,
}: {
  sectionTitle: 'introduction' | 'achievements' | 'skills' | 'links'
  children: React.ReactNode
}) => {
  const sectionTypeMap = new Map(Object.entries(sectionType))

  return (
    <section>
      <Stack direction="row" justifyContent="space-between">
        <Typography>{sectionTypeMap.get(sectionTitle)}</Typography>
        {/* <Link href={'profile/my-profile-setting'}> */}
        <ProfileSectionEditLink sectionTittle={sectionTitle} />
        {/* </Link> */}
      </Stack>
      {children}
    </section>
  )
}

export default ProfileSection
