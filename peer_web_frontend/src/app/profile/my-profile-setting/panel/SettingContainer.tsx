import { Button, Typography } from '@mui/material'
import React from 'react'

const SettingType = {
  introduction: '소개',
  achievements: '업적',
  skills: '스킬',
  links: '링크',
}

const settingTypeMap = new Map(Object.entries(SettingType))

const SettingContainer = ({
  settingTitle,
  onNegativeClick,
  onPositiveClick,
  children,
}: {
  settingTitle: string
  onNegativeClick: (object: any) => void
  onPositiveClick: (object: any) => void
  children: React.ReactNode
}) => {
  return (
    <div>
      <Typography>{settingTypeMap.get(settingTitle)} 수정</Typography>
      {children}
      <Button variant="contained" onClick={onNegativeClick}>
        취소
      </Button>
      <Button variant="contained" onClick={onPositiveClick}>
        완료
      </Button>
    </div>
  )
}

export default SettingContainer
