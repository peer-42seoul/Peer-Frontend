import { Typography } from '@mui/material'
import React from 'react'
import ProfileCard from './panel/ProfileCard'
import ProfileSection from './panel/ProfileSection'
import { IUserProfile } from '@/types/IUserProfile'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'
import ProfileLinksSection from './panel/ProfileLinksSection'

// TODO 용훈님과 링크 관련 api 논의 필요 (link에 대한 이름도 받음)

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

// TODO 소개 - 수정 이런 ui 다른 공통 컴포넌트로 빼기
const MyProfile = () => {
  const username = 'hyna'
  const userid = '1'

  const [data, isLoading, error] = useSWR(
    `http://localhost:4000/profile/${userid}`,
    defaultGetFetcher,
  )

  return (
    <div>
      <Typography>프로필</Typography>
      <ProfileSection sectionTitle="introduction">
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
      <ProfileSection sectionTitle="achievements">achievements</ProfileSection>
      <ProfileSection sectionTitle="skills">skills</ProfileSection>
      <ProfileSection sectionTitle="links">
        <ProfileLinksSection linkList={userInfo.linkList} />
      </ProfileSection>
    </div>
  )
}

export default MyProfile
