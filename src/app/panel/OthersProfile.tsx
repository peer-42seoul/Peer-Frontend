'use client'

import { Button } from '@mui/base'
import { Box, Popover, Typography } from '@mui/material'
import {
  MouseEvent,
  ReactElement,
  ReactNode,
  cloneElement,
  useState,
} from 'react'

interface IOthersProfile {
  name: string
  userId: string
  children: ReactNode
}

const OthersProfile = ({ name, userId, children }: IOthersProfile) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // 인자로 받는 컴포넌트를 복사해서 onClick 이벤트를 추가
  const cloneChild = cloneElement(children as ReactElement, {
    onClick: handleClick,
  })

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      {cloneChild}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography>이름: {name}</Typography>
          <Typography>아이디: {userId}</Typography>
          <Button>프로필 보기</Button>
          <Button>쪽지 보내기</Button>
          <Button>신고하기</Button>
        </Box>
      </Popover>
    </div>
  )
}

export default OthersProfile
