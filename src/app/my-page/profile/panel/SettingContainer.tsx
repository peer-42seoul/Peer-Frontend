import CuButton from '@/components/CuButton'
import { Box, Typography } from '@mui/material'
import React from 'react'

// TODO 모바일에서 페이지로 넘어가는 것이 아닌 모달을 띄우는 것으로 변경됨 리펙토링 필요
const SettingType = {
  introduction: '소개',
  achievements: '업적',
  skills: '스킬',
  links: '링크',
}

const settingTypeMap = new Map(Object.entries(SettingType))

// TODO 2스텝 때 업적 어떻게 할 지 고민해보기.
const SettingContainer = ({
  settingTitle,
  onNegativeClick,
  children,
  isSubmitting, // onPositiveClick,
}: {
  settingTitle: string
  onNegativeClick: () => void
  children: React.ReactNode
  isSubmitting: boolean
  // onPositiveClick?: (object: any) => void
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        gap: '24px',
      }}
    >
      <Typography
        id={`profile-${settingTitle}-setting-modal-title`}
        variant="Title2Emphasis"
        sx={{ textAlign: 'center' }}
      >
        {settingTypeMap.get(settingTitle)} 수정
      </Typography>
      <Box id={`profile-${settingTitle}-setting-modal-description`}>
        {children}
      </Box>
      <div style={{ width: '100%', justifyContent: 'space-between' }}>
        <CuButton
          variant="text"
          action={onNegativeClick}
          disabled={isSubmitting}
          message="취소"
          style={{ width: '50%' }}
          TypographyProps={{
            color: 'purple.strong',
            fontSize: '14px',
            fontWeight: '500',
          }}
        />
        {/* {onPositiveClick ? (
        <Button variant="contained" onClick={onPositiveClick}>
          완료
        </Button>
      ) : ( */}
        <CuButton
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          message={isSubmitting ? '제출 중' : '완료'}
          action={() => {}}
          style={{ width: '50%' }}
          TypographyProps={{
            color: 'text.normal',
            fontSize: '14px',
            fontWeight: '500',
          }}
        />
      </div>
    </div>
  )
}

export default SettingContainer
