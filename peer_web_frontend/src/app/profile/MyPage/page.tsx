'use client'
import { Box, /*Grid,*/ Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProfileCard from './panel/ProfileCard'
import ProfileSection from './panel/ProfileSection'
import { IUserProfile } from '@/types/IUserProfile'
import ProfileLinksSection from './panel/ProfileLinksSection'
import ModalContainer from '@/components/ModalContainer'
import ProfileBioEditor from './panel/ProfileBioEditor'

const userInfo: IUserProfile = {
  id: 1,
  nickname: 'hyna',
  profileImageUrl: 'https://picsum.photos/100',
  introduction: 'not a squad, salt',
  linkList: [
    {
      id: 1,
      link: 'https://profile.intra.42.fr/users/hyna',
      linkName: 'intra profile',
    },
    {
      id: 2,
      link: 'https://www.linkedin.com/in/%ED%98%84-%EB%82%98-98199227a/',
      linkName: 'linkedIn',
    },
  ],
  representAchievement: 'beginner',
  achievements: ['beginner', 'too much talker', 'tester'],
  association: '42seoul',
  email: 'hyna@student.42seoul.kr',
}

interface IModals {
  introduction: boolean
  achievements: boolean
  skills: boolean
  links: boolean
}

// TODO 소개 - 수정 이런 ui 다른 공통 컴포넌트로 빼기
// TODO Grid 쓸지 말지 결정하기 (모바일과 PC 모두 한 줄로 되어있음)
const MyProfile = () => {
  // const username = 'hyna'
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

  return (
    <Box>
      <Typography>프로필</Typography>
      {/* <Grid container> */}
      {/* profile introduction part */}
      {/* <Grid item xs={12} md={6}> */}
      <ProfileSection sectionTitle="introduction" setModalType={setModalType}>
        {/* 프로필 이미지, 유저 이름, 소속(42?), 아이디, 이메일 표시 컴포넌트 */}
        <ProfileCard
          profileImageURL={userInfo.profileImageUrl}
          nickname={userInfo.nickname}
          association={userInfo?.association}
          email={userInfo.email}
          introduction={userInfo.introduction}
        />
        {/* <div>biography</div> */}
      </ProfileSection>
      {/* </Grid> */}

      {/* profile home */}
      {/* <Grid item> */}
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
      {/* </Grid> */}
      {/* profile home end*/}
      {/* </Grid> */}

      {/* modals */}
      <ModalContainer
        open={modalOpen.introduction}
        handleClose={() => setModalType('')}
        title="프로필 소개 섹션 수정 모달"
        description="닉네임, 자기 소개 수정 폼"
      >
        <ProfileBioEditor
          data={{
            profileImageURL: userInfo.profileImageUrl,
            nickname: userInfo.nickname,
            association: userInfo.association,
            email: userInfo.email,
            introduction: userInfo.introduction,
          }}
          closeModal={() => setModalType('')}
        />
      </ModalContainer>
    </Box>
  )
}

export default MyProfile
