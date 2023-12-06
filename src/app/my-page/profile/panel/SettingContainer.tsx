// TODO : 현 시점에 사용되지 않음... 확인 후 삭제 예정
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
    <div>
      <Typography id={`profile-${settingTitle}-setting-modal-title`}>
        {settingTypeMap.get(settingTitle)} 수정
      </Typography>
      <Box id={`profile-${settingTitle}-setting-modal-description`}>
        {children}
      </Box>
      <CuButton
        variant="contained"
        action={onNegativeClick}
        disabled={isSubmitting}
        message="취소"
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
      />
    </div>
  )
}

export default SettingContainer
