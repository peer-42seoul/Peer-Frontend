'use client'
import { Box, Modal, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import ProfileSection from './ProfileSection'
import * as style from './Profile.style'
import useMedia from '@/hook/useMedia'
import CuAvatar from '@/components/CuAvatar'

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
        sx={style.profileImageModalStyle}
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
  isEditable,
}: {
  profileImageUrl: string | null
  nickname: string
  association: string | null
  introduction: string | null
  email: string
  setModalType: (type: string) => void | null
  isEditable: boolean
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const handleModalClose = () => {
    setOpen(false)
  }
  const { isPc } = useMedia()

  return (
    <Stack
      spacing={isPc ? 3 : 2}
      alignSelf={'stretch'}
      sx={isPc ? style.profileCardPcStyle : style.profileCardMobileStyle}
    >
      <ProfileSection
        sectionTitle={'introduction'}
        setModalType={setModalType}
        titleTypographyProps={{
          variant: isPc ? 'Title3Emphasis' : 'Body1Emphasis',
          color: 'text.normal',
          component: 'h3',
        }}
        sx={{ height: '2.5rem' }}
        isEditable={isEditable}
      />
      <Stack direction="row" spacing={0.75} alignItems={'center'}>
        {/* image component */}
        <CuAvatar
          src={profileImageUrl ? profileImageUrl : ''}
          onClick={isEditable ? () => setOpen(true) : () => {}}
          sx={style.profileImageStyle}
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
      <Typography
        variant="Body2"
        color={'text.normal'}
        sx={style.profileIntroductionStyle}
      >
        {introduction}
      </Typography>
      <ProfileImageModal
        open={open}
        handleModalClose={handleModalClose}
        profileImageUrl={profileImageUrl}
      />
    </Stack>
  )
}

export default ProfileCard
