'use client'
import { AlertColor, Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProfileCard from './panel/ProfileCard'
import ProfileSection from './panel/ProfileSection'
import { IUserProfile } from '@/types/IUserProfile'
import ProfileLinksSection from './panel/ProfileLinksSection'
import CuModal from '@/components/CuModal'
import ProfileBioEditor from './panel/ProfileBioEditor'
import ProfileLinkEditor from './panel/ProfileLinkEditor'
import useToast from '@/hook/useToast'
import useMedia from '@/hook/useMedia'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'
import { useCookies } from 'react-cookie'
import useAuthStore from '@/states/useAuthStore'
import CuButton from '@/components/CuButton'
import { useRouter } from 'next/navigation'

interface IModals {
  introduction: boolean
  achievements: boolean
  skills: boolean
  links: boolean
}

interface IToastProps {
  severity?: AlertColor
  message: string
}

const mobileStyle = {
  width: '100vmax',
  height: '100vmax',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

// TODO 소개 - 수정 이런 ui 다른 공통 컴포넌트로 빼기
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

  const [modalType, setModalType] = useState<string>('' as string)
  const [modalOpen, setModalOpen] = useState<IModals>({
    introduction: false,
    achievements: false,
    skills: false,
    links: false,
  })
  const [toastMessage, setToastMessage] = useState<IToastProps>(
    {} as IToastProps,
  )

  const { isPc } = useMedia()

  useEffect(() => {
    const newModalOpen: IModals = {
      introduction: false,
      achievements: false,
      skills: false,
      links: false,
    }

    if (modalType === 'introduction') {
      newModalOpen.introduction = true
    } else if (modalType === 'achievements') {
      newModalOpen.achievements = true
    } else if (modalType === 'skills') {
      newModalOpen.skills = true
    } else if (modalType === 'links') {
      newModalOpen.links = true
    } else if (modalType === '') {
      console.log('API GET request!')
    }

    setModalOpen(newModalOpen)
  }, [modalType])

  const { CuToast, isOpen: isToastOpen, openToast, closeToast } = useToast()

  const router = useRouter()
  const { logout } = useAuthStore.getState()
  const [, , removeCookie] = useCookies(['refreshToken'])
  const handleLogout = () => {
    logout()
    removeCookie('refreshToken', { path: '/' })
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
    <Box
      // px={[2, 4]} py={[3, 4]}
      width={1}
    >
      {!isPc && <Typography>프로필</Typography>}

      <ProfileSection
        sectionTitle="introduction"
        setModalType={setModalType}
        sx={{ marginBottom: '24px' }}
      >
        {/* 프로필 이미지, 유저 이름, 소속(42?), 아이디, 이메일 표시 컴포넌트 */}
        <ProfileCard
          profileImageUrl={userInfo.profileImageUrl}
          nickname={userInfo.nickname}
          association={userInfo?.association}
          email={userInfo.email}
          introduction={userInfo.introduction}
        />
      </ProfileSection>

      {/* profile home */}
      <Box>
        <ProfileSection sectionTitle="achievements" setModalType={setModalType}>
          achievements
        </ProfileSection>
        <ProfileSection sectionTitle="skills" setModalType={setModalType}>
          skills
        </ProfileSection>
        <ProfileSection sectionTitle="links" setModalType={setModalType}>
          <ProfileLinksSection linkList={userInfo.linkList} />
        </ProfileSection>
        <CuButton variant="text" action={handleLogout} message="로그아웃" />
      </Box>
      {/* profile home end*/}

      {/* modals */}
      <CuModal
        open={modalOpen.introduction}
        handleClose={() => setModalType('')}
        ariaTitle="profile-introduction-setting-modal-title"
        ariaDescription="profile-introduction-setting-modal-description"
        style={isPc ? undefined : mobileStyle}
      >
        <ProfileBioEditor
          data={{
            profileImageUrl: userInfo.profileImageUrl,
            nickname: userInfo.nickname,
            association: userInfo.association,
            email: userInfo.email,
            introduction: userInfo.introduction,
          }}
          setToastMessage={setToastMessage}
          setToastOpen={openToast}
          closeModal={() => setModalType('')}
          mutate={mutate}
        />
      </CuModal>
      <CuModal
        open={modalOpen.links}
        handleClose={() => setModalType('')}
        ariaTitle="profile-links-setting-modal-title"
        ariaDescription="profile-links-setting-modal-description"
        style={isPc ? undefined : mobileStyle}
      >
        <ProfileLinkEditor
          links={userInfo?.linkList}
          closeModal={() => setModalType('')}
          setToastMessage={setToastMessage}
          setToastOpen={openToast}
          mutate={mutate}
        />
      </CuModal>
      {/* toast */}
      <CuToast
        open={isToastOpen}
        onClose={closeToast}
        severity={toastMessage.severity}
      >
        <Typography>{toastMessage.message}</Typography>
      </CuToast>
    </Box>
  )
}

export default MyProfile
