'use client'
import { Avatar, Box, Modal, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import ProfileSection from './ProfileSection'

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
        component={'img'}
        sx={{
          width: '80%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          border: 'none',
          outline: 'none',
          transform: 'translate(-50%, -50%)',
        }}
        alt="profile image"
        src={profileImageUrl ? profileImageUrl : '/images/profile.jpeg'}
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
  setModalType,
}: {
  profileImageUrl: string | null
  nickname: string
  association: string | null
  introduction: string | null
  email: string
  setModalType: (type: string) => void
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const handleModalClose = () => {
    setOpen(false)
  }

  return (
    <Stack
      spacing={3}
      p={3}
      alignSelf={'stretch'}
      sx={{
        backgroundColor: 'background.secondary',
        borderRadius: '1rem',
        height: '100%',
      }}
    >
      <ProfileSection
        sectionTitle={'introduction'}
        setModalType={setModalType}
        titleTypographyProps={{
          variant: 'Title3Emphasis',
          color: 'text.normal',
        }}
      />
      <Stack direction="row" spacing={0.75} alignItems={'center'}>
        {/* image component */}

        <Avatar
          src={profileImageUrl ? profileImageUrl : '/images/profile.jpeg'}
          onClick={() => setOpen(true)}
          sx={{
            width: '3rem',
            height: '3rem',
          }}
        />
        {/* 유저 이름, 소속, 유저 아이디, 유저 이메일 */}
        <Stack spacing={0.5}>
          <Typography variant="Body2" color={'text.normal'}>
            {nickname}
          </Typography>
          {association && (
            <Typography
              variant="Caption"
              color={'text.alternative'}
              sx={{ marginRight: '0.25rem' }}
            >
              {association}
            </Typography>
          )}
          <Typography variant="Caption" color={'text.alternative'}>
            {email}
          </Typography>
        </Stack>
      </Stack>
      <Box width={1} sx={{ minHeight: '4.5rem' }}>
        <Typography variant="Body2" color={'text.normal'}>
          {introduction}
        </Typography>
      </Box>
      <ProfileImageModal
        open={open}
        handleModalClose={handleModalClose}
        profileImageUrl={profileImageUrl}
      />
    </Stack>
  )
}

export default ProfileCard
