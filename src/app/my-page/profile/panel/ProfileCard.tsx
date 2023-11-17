'use client'
import { Avatar, Box, Modal, Stack, Typography } from '@mui/material'
import { IProfileCard } from '@/types/IUserProfile'
import React, { useState } from 'react'

// TODO css 다른 파일로 빼기

interface IProfileImageModalProps {
  open: boolean
  handleModalClose: () => void
  profileImageUrl: string | null
}

// 프로필 이미지 확대 모달
const ProfileImageModal = ({
  open,
  handleModalClose,
  profileImageUrl,
}: IProfileImageModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      keepMounted
      sx={{ border: 'none', outline: 'none' }}
    >
      <Box
        component="img"
        src={profileImageUrl ? profileImageUrl : '/images/profile.jpeg'}
        aria-labelledby="유저 이미지"
        aria-describedby="확대된 유저 이미지"
        sx={{
          width: '80%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          border: 'none',
          outline: 'none',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </Modal>
  )
}

const ProfileCard = ({
  profileImageUrl,
  nickname,
  association,
  introduction,
  email,
}: IProfileCard) => {
  const [open, setOpen] = useState<boolean>(false)
  const handleModalClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Stack direction="row">
        {/* image component */}
        <div
          style={{
            width: '56px',
            height: '56px',
            padding: '5px 3px',
          }}
        >
          <Avatar
            src={profileImageUrl ? profileImageUrl : '/images/profile.jpeg'}
            onClick={() => setOpen(true)}
            sx={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
        {/* 유저 이름, 소속, 유저 아이디, 유저 이메일 */}
        <Stack
          spacing={0.5}
          sx={{
            margin: '0 0 0 4px',
          }}
        >
          <Typography variant="Body2">{nickname}</Typography>
          {association && (
            <Typography variant="Caption">{association}</Typography>
          )}
          <Typography variant="Caption">{email}</Typography>
        </Stack>
      </Stack>
      <Box>
        <Typography variant="Body2">{introduction}</Typography>
      </Box>
      <ProfileImageModal
        open={open}
        handleModalClose={handleModalClose}
        profileImageUrl={profileImageUrl}
      />
    </div>
  )
}

export default ProfileCard
