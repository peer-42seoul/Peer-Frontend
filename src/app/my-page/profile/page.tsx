'use client'
import { Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProfileCard from './panel/ProfileCard'
import { IUserProfile } from '@/types/IUserProfile'
import ProfileBioEditor from './panel/ProfileBioEditor'
import ProfileLinkEditor from './panel/ProfileLinkEditor'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'
import useAuthStore from '@/states/useAuthStore'
import CuButton from '@/components/CuButton'
import { useRouter } from 'next/navigation'
import MyInfoCard from './panel/MyInfoCard'
import useMedia from '@/hook/useMedia'
import * as style from '../panel/my-page.style'
import MyPortfolio from './panel/MyPortfolio'

interface IModals {
  introduction: boolean
  achievements: boolean
  skills: boolean
  links: boolean
}

const MyProfile = () => {
  const axiosWithAuth = useAxiosWithAuth()
  const {
    data: userInfo,
    error,
    isLoading,
    mutate,
  } = useSWR<IUserProfile>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )

  const { isPc } = useMedia()

  const [modalType, setModalType] = useState<string>('' as string)
  const [modalOpen, setModalOpen] = useState<IModals>({
    introduction: false,
    achievements: false,
    skills: false,
    links: false,
  })

  useEffect(() => {
    const newModalOpen: IModals = {
      introduction: false,
      achievements: false,
      skills: false,
      links: false,
    }

    if (modalType === 'introduction') {
      newModalOpen.introduction = true
    } else if (modalType === 'skills') {
      newModalOpen.skills = true
    } else if (modalType === 'links') {
      newModalOpen.links = true
    } else if (modalType === '') {
      console.log('API GET request!')
    }

    setModalOpen(newModalOpen)
  }, [modalType])

  const router = useRouter()
  const { logout } = useAuthStore.getState()
  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (error) {
    return <Typography>데이터 조회에 실패했습니다.</Typography>
  }
  if (isLoading) {
    return (
      <>
        <Typography>로딩중 입니다.</Typography>
        <CuButton variant="text" action={handleLogout} message="로그아웃" />
      </>
    )
  }
  if (!userInfo) {
    return <Typography>데이터가 없습니다.</Typography>
  }

  return (
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
        setModalType={setModalType}
        isEditable={true}
      />

      {/* profile my info */}
      <MyInfoCard
        linkList={userInfo?.linkList}
        setModalType={setModalType}
        handleLogout={handleLogout}
        isEditable={true}
      />

      <MyPortfolio />
      {/* modals */}
      <ProfileBioEditor
        data={{
          profileImageUrl: userInfo.profileImageUrl,
          nickname: userInfo.nickname,
          association: userInfo.association,
          email: userInfo.email,
          introduction: userInfo.introduction,
        }}
        closeModal={() => setModalType('')}
        mutate={mutate}
        open={modalOpen.introduction}
      />
      <ProfileLinkEditor
        links={userInfo?.linkList}
        closeModal={() => setModalType('')}
        mutate={mutate}
        open={modalOpen.links}
      />
    </Stack>
  )
}

export default MyProfile
