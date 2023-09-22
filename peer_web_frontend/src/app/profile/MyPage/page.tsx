'use client'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProfileCard from './panel/ProfileCard'
import ProfileSection from './panel/ProfileSection'
import { IUserProfile } from '@/types/IUserProfile'
import ProfileLinksSection from './panel/ProfileLinksSection'

const userInfo: IUserProfile = {
  id: 1,
  profileImageUrl: 'https://picsum.photos/100',
  introduction: 'not a squad, salt',
  linkList: [
    {
      link: 'https://profile.intra.42.fr/users/hyna',
      linkTitle: 'intra profile',
    },
    {
      link: 'https://www.linkedin.com/in/%ED%98%84-%EB%82%98-98199227a/',
      linkTitle: 'linkedIn',
    },
  ],
  phone: '010-0707-2000',
  representAchievement: ['beginner'],
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
const MyProfile = () => {
  const username = 'hyna'
  const [modalType, setModalType] = useState<string>('' as string)
  const [modalOpen, setModalOpen] = useState<IModals>({
    introduction: false,
    achievements: false,
    skills: false,
    links: false,
  })

  useEffect(() => {
    setModalOpen({
      introduction: false,
      achievements: false,
      skills: false,
      links: false,
    })
    if (modalType === 'introduction')
      setModalOpen((prev) => ({ ...prev, introduction: true }))
    else if (modalType === 'achievements')
      setModalOpen((prev) => ({ ...prev, achievements: true }))
    else if (modalType === 'skills')
      setModalOpen((prev) => ({ ...prev, achievements: true }))
    else if (modalType === 'links')
      setModalOpen((prev) => ({ ...prev, achievements: true }))
  }, [modalType])

  return (
    <Box>
      <Typography>프로필</Typography>
      <ProfileSection sectionTitle="introduction" setModalType={setModalType}>
        {/* 프로필 이미지, 유저 이름, 소속(42?), 아이디, 이메일 표시 컴포넌트 */}
        <ProfileCard
          profileImageURL={userInfo.profileImageUrl}
          username={username}
          association={userInfo?.association}
          email={userInfo.email}
          introduction={userInfo.introduction}
        />
        {/* <div>biography</div> */}
      </ProfileSection>
      {/* profile home */}
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
  )
}

export default MyProfile
