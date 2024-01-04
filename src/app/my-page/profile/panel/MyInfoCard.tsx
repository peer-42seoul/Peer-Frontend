import { Grid, Typography } from '@mui/material'
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
    <Grid
      container
      rowSpacing={isPc ? 3 : 2}
      columnSpacing={0.75}
      sx={isPc ? style.profileCardPcStyle : style.profileCardMobileStyle}
      width={'100%'}
    >
      <Grid item xs={12}>
        <Typography variant={'Title3Emphasis'}>내 정보</Typography>
      </Grid>
      <Grid container item xs={12}>
        <Skills setModalType={setModalType} />
      </Grid>
      <Grid item xs={12}>
        <ProfileLinksSection linkList={linkList} setModalType={setModalType} />
      </Grid>
      <Grid item xs={12}>
        <CuButton variant="text" action={handleLogout} message="로그아웃" />
      </Grid>
    </Grid>
  )
}

export default MyInfoCard
