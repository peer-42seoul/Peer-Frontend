import { Button, Typography } from '@mui/material'
import React from 'react'

const SettingType = {
  introduction: '소개',
  achievements: '업적',
  skills: '스킬',
  links: '링크',
}

const settingTypeMap = new Map(Object.entries(SettingType))

// TODO 2스텝 때 업적 어떻게 할 지 고민해보기. 우선 업적 파트를 고려하여 submit이 아니어도 가능하게 해두었음
const SettingContainer = ({
  settingTitle,
  onNegativeClick,
  children,
  onPositiveClick,
}: {
  settingTitle: string
  onNegativeClick: (object: any) => void
  children: React.ReactNode
  onPositiveClick?: (object: any) => void
}) => {
  return (
    <div>
      <Typography>{settingTypeMap.get(settingTitle)} 수정</Typography>
      {children}
      <Button variant="contained" onClick={onNegativeClick}>
        취소
      </Button>
      {onPositiveClick ? (
        <Button variant="contained" onClick={onPositiveClick}>
          완료
        </Button>
      ) : (
        <Button
          variant="contained"
          type="submit"
          // onClick={onPositiveClick}
        >
          완료
        </Button>
      )}
    </div>
  )
}

export default SettingContainer
