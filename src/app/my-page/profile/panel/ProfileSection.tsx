import { Box, Button, Stack, SxProps, Typography } from '@mui/material'
import React from 'react'

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
  sx,
}: {
  sectionTitle: 'introduction' | 'achievements' | 'skills' | 'links'
  children: React.ReactNode
  setModalType: (type: string) => void
  sx?: SxProps
}) => {
  const sectionTypeMap = new Map(Object.entries(SectionType))
  const handleEditClick = () => {
    setModalType(sectionTitle)
  }

  return (
    <Box sx={sx}>
      {/* 스타일을 넣기 위해 우선 넣었습니다. */}
      <section>
        <Stack direction="row" justifyContent="space-between">
          <Typography>{sectionTypeMap.get(sectionTitle)}</Typography>
          <Button variant="text" onClick={handleEditClick}>
            <Typography>수정</Typography>
          </Button>
        </Stack>
        {children}
      </section>
    </Box>
  )
}

export default ProfileSection
