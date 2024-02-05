'use client'

import { Button, Stack, Typography, IconButton } from '@mui/material'
import React from 'react'
import useMedia from '@/hook/useMedia'
import * as style from '../../my-page/panel/my-page.style'
import ProfileCard from '../../my-page/profile/panel/ProfileCard'
import MyInfoCard from '../../my-page/profile/panel/MyInfoCard'
import { useRouter } from 'next/navigation'
import { ChevronLeft, CloseIcon } from '@/icons'
import useSWR from 'swr'
import { IUserProfile } from '@/types/IUserProfile'
import PortfolioList from './panel/PortfolioList'
import axios from 'axios'

const Profile = ({ params }: { params: { id: string } }) => {
  const {
    data: userInfo,
    error,
    isLoading,
  } = useSWR<IUserProfile>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/otherUser?userId=${params.id}`,
    (url: string) => axios.get(url).then((res) => res.data),
  )
  const { isPc } = useMedia()
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  if (error) {
    return <Typography>데이터 조회에 실패했습니다.</Typography>
  }
  if (isLoading) {
    return <Typography>로딩중 입니다.</Typography>
  }
  if (!userInfo) {
    return <Typography>데이터가 없습니다.</Typography>
  }

  return (
    <>
      {isPc ? (
        <Stack
          width="100%"
          direction="row"
          justifyContent="space-between"
          alignItems={'center'}
          marginBottom={'1.5rem'}
        >
          <Stack direction="row" spacing={0.5}>
            <Typography variant="Body2" color={'purple.alternative'}>
              {userInfo.nickname}
            </Typography>
            <Typography variant="Body2" color={'text.strong'}>
              님의 프로필 :
            </Typography>
          </Stack>
          <Button onClick={goBack}>
            <Typography variant="CaptionEmphasis" color={'text.alternative'}>
              돌아가기
            </Typography>
          </Button>
        </Stack>
      ) : (
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          height={'2.5rem'}
          marginBottom={'1.5rem'}
        >
          <IconButton
            onClick={goBack}
            sx={{ width: '1.25rem', height: '1.25rem' }}
          >
            <ChevronLeft />
          </IconButton>
          <Stack direction="row" spacing={0.8}>
            <Typography variant="Body2Emphasis" color={'purple.strong'}>
              {userInfo.nickname}
            </Typography>
            <Typography variant="Body2" color={'text.alternative'}>
              님의 프로필
            </Typography>
          </Stack>
          <IconButton
            onClick={goBack}
            sx={{
              width: '1.25rem',
              height: '1.25rem',
              color: 'text.assistive',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      )}
      <Stack
        width={1}
        spacing={isPc ? '2rem' : '1.5rem'}
        sx={isPc ? style.pagePcStyle : style.pageMobileStyle}
        justifyContent={'center'}
      >
        {/* 프로필 이미지, 유저 이름, 소속(42?), 아이디, 이메일 표시 컴포넌트 */}
        <ProfileCard
          profileImageUrl={userInfo.profileImageUrl}
          nickname={userInfo.nickname}
          association={userInfo?.association}
          email={userInfo.email}
          introduction={userInfo.introduction}
          setModalType={() => {}}
          isEditable={false}
        />

        {/* profile my info */}
        <MyInfoCard
          skillList={userInfo?.skillList}
          linkList={userInfo?.linkList}
          setModalType={() => {}}
          handleLogout={() => {}}
          isEditable={false}
        />
        {/* portfolio list */}
        {userInfo?.portfolioVisibility && <PortfolioList userId={params.id} />}
      </Stack>
    </>
  )
}
export default Profile
