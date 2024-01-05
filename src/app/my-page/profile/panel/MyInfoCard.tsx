import { Stack, Typography } from '@mui/material'
import React from 'react'
import Skills from './Skills'
import ProfileLinksSection from './ProfileLinksSection'
import CuButton from '@/components/CuButton'
import { IUserProfileLink } from '@/types/IUserProfile'
import useMedia from '@/hook/useMedia'
import * as style from './Profile.style'

const MyInfoCard = ({
  linkList,
  setModalType,
  handleLogout,
}: {
  linkList: Array<IUserProfileLink>
  setModalType: (type: string) => void
  handleLogout: () => void
}) => {
  const { isPc } = useMedia()
  return (
    <Stack
      spacing={isPc ? 3 : 2}
      direction={'column'}
      sx={isPc ? style.profileCardPcStyle : style.profileCardMobileStyle}
    >
      <Typography variant={'Title3Emphasis'}>내 정보</Typography>
      <Skills setModalType={setModalType} />
      <ProfileLinksSection linkList={linkList} setModalType={setModalType} />
      <CuButton variant="text" action={handleLogout} message="로그아웃" />
    </Stack>
  )
}

export default MyInfoCard
