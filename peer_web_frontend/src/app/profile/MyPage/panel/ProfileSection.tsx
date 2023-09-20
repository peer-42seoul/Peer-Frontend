import { Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

// 이후 라우팅 처리르 위한 객체입니다.
const SectionType = {
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
  const sectionTypeMap = new Map(Object.entries(SectionType))
  return (
    <section>
      <Stack direction="row" justifyContent="space-between">
        <Typography>{sectionTypeMap.get(sectionTitle)}</Typography>
        <Link href={'profile/my-profile-setting'}>
          <Typography>수정</Typography>
        </Link>
      </Stack>
      {children}
    </section>
  )
}

export default ProfileSection
