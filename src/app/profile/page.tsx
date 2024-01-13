'use client'

import { Stack, Typography } from '@mui/material'
import React from 'react'
import useMedia from '@/hook/useMedia'
import * as style from '../my-page/panel/my-page.style'
import ProfileCard from '../my-page/profile/panel/ProfileCard'
import MyInfoCard from '../my-page/profile/panel/MyInfoCard'

const profile = {
  profileImageUrl:
    'https://kr1-api-object-storage.nhncloudservice.com/v1/AUTH_ad016d3302b840af94a1946c5784d85a/PeerStorage/profile/image/06ea9b15-4f48-4055-a62a-e3cbde530473.png',
  nickname: 'woorim',
  email: 'wrkimlimi@gmail.com',
  association: null,
  introduction: '안녕하세요 woorikim입니다!',
  linkList: [
    {
      id: 4,
      linkUrl: 'https://github.com/KRimwoo',
      linkName: 'Github',
    },
  ],
}

const Profile = () => {
  const [userInfo, setUserInfo] = React.useState(profile)
  const { isPc } = useMedia()
  return (
    <Stack>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="Body2" color={'purple.alternative'}>
          {userInfo.nickname}
        </Typography>
        <Typography variant="Body2" color={'text.strong'}>
          님의 프로필
        </Typography>
      </Stack>
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
          linkList={userInfo?.linkList}
          setModalType={() => {}}
          handleLogout={() => {}}
          isEditable={false}
        />
      </Stack>
    </Stack>
  )
}
export default Profile
