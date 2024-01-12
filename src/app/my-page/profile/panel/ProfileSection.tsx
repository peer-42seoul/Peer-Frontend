import {
  Button,
  Stack,
  SxProps,
  Typography,
  TypographyProps,
} from '@mui/material'
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
  setModalType,
  titleTypographyProps,
  sx,
}: {
  sectionTitle: 'introduction' | 'achievements' | 'skills' | 'links'
  setModalType: (type: string) => void
  sx?: SxProps
  titleTypographyProps?: TypographyProps
}) => {
  const sectionTypeMap = new Map(Object.entries(SectionType))
  const handleEditClick = () => {
    setModalType(sectionTitle)
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems={'center'}
      minHeight={'1.5rem'}
      sx={sx}
    >
      <Typography {...titleTypographyProps}>
        {sectionTypeMap.get(sectionTitle)}
      </Typography>
      <Button
        variant="text"
        onClick={handleEditClick}
        sx={{
          padding: '0 0.25rem',
          width: 'fit-content',
          height: '1.5rem',
          minWidth: '1.8rem',
        }}
      >
        <Typography
          variant="CaptionEmphasis"
          color={'text.alternative'}
          sx={{ padding: 0, whiteSpace: 'pre-line', wordBreak: 'keep-all' }}
        >
          수정
        </Typography>
      </Button>
    </Stack>
  )
}

export default ProfileSection
