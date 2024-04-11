'use client'

import ReportModal from '@/components/ReportModal'
import { Box, Button, Popover, Typography } from '@mui/material'
import { MouseEvent, ReactNode, useState } from 'react'
import { useRouter } from 'next/navigation'
import useNicknameStore from '@/states/useNicknameStore'
import ExternalMessageModal from './ExternalMessageModal'

interface IOthersProfile {
  name: string
  userId: string
  children: ReactNode
}

const OthersProfile = ({ name, userId, children }: IOthersProfile) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [modalType, setModalType] = useState<string>('' as string)
  const nickname = useNicknameStore.getState().nickname

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

  // 유령회원일 경우
  if (Number(userId) === -1) return <>{children}</>

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
          aria-label="프로필 보기"
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
          {nickname !== name ? (
            <>
              <Button onClick={goOthersProfile} aria-label="프로필 보기">
                프로필 보기
              </Button>
              <Button onClick={messageOpen} aria-label="쪽지 보내기">
                쪽지 보내기
              </Button>
              <Button onClick={reportOpen} aria-label="신고하기">
                신고하기
              </Button>
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
      <ExternalMessageModal
        targetId={Number(userId)}
        targetNickname={name}
        isOpen={modalType === 'message'}
        handleClose={handleModalClose}
      />
    </div>
  )
}

export default OthersProfile
