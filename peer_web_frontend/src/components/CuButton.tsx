'use client'

import { Button } from '@mui/material'
import { SxProps } from '@mui/system'

interface CuButtonProps {
  style: SxProps //나중에 들어갈 스타일
  message: string //버튼에 들어갈 메시지
  action: () => void //버튼을 눌렀을 때 실행할 함수
}

const CuButton = ({ style, message, action }: CuButtonProps) => {
  return (
    <Button onClick={action} sx={style}>
      {message}
    </Button>
  )
}

export default CuButton
