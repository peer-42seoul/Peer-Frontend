import { Stack, Typography } from '@mui/material'
// import Link from 'next/link'
import React from 'react'
import ProfileSectionEditLink from './ProfileSectionEditLink'

const SectionType = {
  introduction: '소개',
  achievements: '업적',
  skills: '스킬',
  links: '링크',
}

const ProfileSection = ({
  sectionTitle,
  children,
  setModalType,
}: {
  sectionTitle: 'introduction' | 'achievements' | 'skills' | 'links'
  children: React.ReactNode
  setModalType: (type: string) => void
}) => {
  const sectionTypeMap = new Map(Object.entries(SectionType))

  return (
    <section>
      <Stack direction="row" justifyContent="space-between">
        <Typography>{sectionTypeMap.get(sectionTitle)}</Typography>
        <ProfileSectionEditLink
          sectionTitle={sectionTitle}
          setModalType={setModalType}
        />
      </Stack>
      {children}
    </section>
  )
}

export default ProfileSection
