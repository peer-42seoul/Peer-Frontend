import { Grid, Typography } from '@mui/material'
import React from 'react'
import Skills from './Skills'
import ProfileLinksSection from './ProfileLinksSection'
import CuButton from '@/components/CuButton'
import { IUserProfileLink } from '@/types/IUserProfile'

const MyInfoCard = ({
  linkList,
  setModalType,
  handleLogout,
}: {
  linkList: Array<IUserProfileLink>
  setModalType: (type: string) => void
  handleLogout: () => void
}) => {
  return (
    <Grid
      container
      p={3}
      pl={2}
      pt={0}
      rowSpacing={3}
      columnSpacing={1}
      sx={{ backgroundColor: 'background.secondary', borderRadius: '16px' }}
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
