'use client'

import ReportModal from '@/components/ReportModal'
import { Box, Button, Popover, Typography } from '@mui/material'
import { MouseEvent, ReactNode, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/states/useAuthStore'
import { jwtDecode } from 'jwt-decode'

interface IOthersProfile {
  name: string
  userId: string
  children: ReactNode
}

const OthersProfile = ({ name, userId, children }: IOthersProfile) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [modalType, setModalType] = useState<string>('' as string)
  const { accessToken } = useAuthStore()

  const user = accessToken ? jwtDecode(accessToken).sub : null

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  // 쪽지보내기 모달 아직
  const messageOpen = () => {
    setModalType('message')
  }

  const reportOpen = () => {
    setModalType('report')
  }

  const handleModalClose = () => {
    setModalType('')
  }

  const goOthersProfile = () => {
    router.push(`/profile/${userId}`)
  }

  const goMypage = () => {
    router.push('/my-page')
  }

  return (
    <div>
      {children && (
        <Button
          variant="text"
          disableRipple
          sx={{
            ':hover': { backgroundColor: 'transparent' },
            p: 0,
            m: 0,
            color: 'inherit',
          }}
          onClick={handleClick}
        >
          {children}
        </Button>
      )}
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
          <Typography sx={{ p: 1 }}>{name}</Typography>
          {user !== userId ? (
            <>
              <Button onClick={goOthersProfile}>프로필 보기</Button>
              <Button onClick={messageOpen}>쪽지 보내기</Button>
              <Button onClick={reportOpen}>신고하기</Button>
            </>
          ) : (
            <Button onClick={goMypage}>마이페이지</Button>
          )}
        </Box>
      </Popover>
      <ReportModal
        isModalOpen={modalType === 'report'}
        handleClose={handleModalClose}
        targetId={userId}
      />
    </div>
  )
}

export default OthersProfile
