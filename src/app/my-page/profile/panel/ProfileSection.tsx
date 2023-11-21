import { Box, Button, Stack, SxProps, Typography } from '@mui/material'
import React from 'react'

// TODO 모바일에서 페이지로 넘어가는 것이 아닌 모달을 띄우는 것으로 변경됨 리펙토링 필요
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
            <Typography variant="CaptionEmphasis">수정</Typography>
          </Button>
        </Stack>
        {children}
      </section>
    </Box>
  )
}

export default ProfileSection
