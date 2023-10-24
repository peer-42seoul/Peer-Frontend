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
import { defaultGetFetcher } from '@/api/fetchers'

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

// TODO 소개 - 수정 이런 ui 다른 공통 컴포넌트로 빼기
// TODO Grid 쓸지 말지 결정하기 (모바일과 PC 모두 한 줄로 되어있음)
const MyProfile = () => {
  const {
    data: userInfo,
    error,
    isLoading,
  } = useSWR<IUserProfile>('http://localhost:4000/profile/1', defaultGetFetcher)

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

  if (error) {
    return <Typography>데이터를 가져오는 것을 실패했습니다.</Typography>
  }
  if (isLoading) {
    return <Typography>로딩중 입니다.</Typography>
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
          profileImageURL={userInfo.profileImageUrl}
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
      </Box>
      {/* profile home end*/}

      {/* modals */}
      <CuModal
        open={modalOpen.introduction}
        handleClose={() => setModalType('')}
        ariaTitle="프로필 소개 섹션 수정 모달"
        ariaDescription="닉네임, 자기 소개 수정 폼"
        style={
          isPc
            ? undefined
            : {
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
        }
      >
        <ProfileBioEditor
          data={{
            profileImageURL: userInfo.profileImageUrl,
            nickname: userInfo.nickname,
            association: userInfo.association,
            email: userInfo.email,
            introduction: userInfo.introduction,
          }}
          setToastMessage={setToastMessage}
          setToastOpen={openToast}
          closeModal={() => setModalType('')}
        />
      </CuModal>
      <CuModal
        open={modalOpen.links}
        handleClose={() => setModalType('')}
        ariaTitle="프로필 링크 섹션 수정 모달"
        ariaDescription="링크 수정 폼"
        style={
          isPc
            ? undefined
            : {
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
        }
      >
        <ProfileLinkEditor
          links={userInfo?.linkList}
          closeModal={() => setModalType('')}
          setToastMessage={setToastMessage}
          setToastOpen={openToast}
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
