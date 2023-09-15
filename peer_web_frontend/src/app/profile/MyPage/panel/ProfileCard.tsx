'use client'
import { Box, Modal, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

// TODO css 다른 파일로 빼기
interface IProfileCard {
  profileImageURL: string | null
  username?: string
  association?: string | null
  introduction?: string
  email?: string
  isLoading: boolean
}

interface IProfileImageModalProps {
  open: boolean
  handleModalClose: () => void
  profileImageURL: string | null
}

// 프로필 이미지 확대 모달
const ProfileImageModal = ({
  open,
  handleModalClose,
  profileImageURL,
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
        src={profileImageURL ? profileImageURL : '/images/profile.jpeg'}
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
        onClick={handleModalClose}
      />
    </Modal>
  )
}

const ProfileCard = ({
  profileImageURL,
  username,
  association,
  introduction,
  email,
  isLoading,
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
          {isLoading ? (
            <Skeleton variant="circular" />
          ) : (
            <Box
              component="img"
              src={profileImageURL ? profileImageURL : '/images/profile.jpeg'}
              onClick={() => setOpen(true)}
              sx={{
                width: '100%',
                height: '100%',
              }}
            />
          )}
        </div>
        {/* 유저 이름, 소속(42?), 유저 아이디, 유저 이메일 */}
        <Stack
          spacing={0.5}
          sx={{
            margin: '0 0 0 4px',
          }}
        >
          {isLoading ? (
            <div>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          ) : (
            <div>
              <Typography>{username}</Typography>
              {association ? (
                <Typography>{association}</Typography>
              ) : (
                <Typography />
              )}
              <Typography>아이디({email})</Typography>
            </div>
          )}
        </Stack>
      </Stack>
      <Box>
        {isLoading ? <Skeleton /> : <Typography>{introduction}</Typography>}
      </Box>
      {(!isLoading && profileImageURL) ?? (
        <ProfileImageModal
          open={open}
          handleModalClose={handleModalClose}
          profileImageURL={profileImageURL}
        />
      )}
    </div>
  )
}

export default ProfileCard
