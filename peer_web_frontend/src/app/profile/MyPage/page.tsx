import { Box, Typography } from '@mui/material'
import React from 'react'
import { UserProfile } from '@/types/UserProfile'
import ProfileCard from './panel/ProfileCard'
import ProfileSection from './panel/ProfileSection'

const userInfo: UserProfile = {
  id: 1,
  profileImageUrl: 'https://picsum.photos/100',
  introduction: 'not a squad, salt',
  linkList: [
    'https://profile.intra.42.fr/users/hyna',
    'https://www.linkedin.com/in/%ED%98%84-%EB%82%98-98199227a/',
  ],
  phone: '010-0707-2000',
  representAchievement: ['beginner'],
  achievements: ['beginner', 'too much talker', 'tester'],
  association: '42seoul',
  userId: 'hyna',
  email: 'hyna@student.42seoul.kr',
}

// TODO 소개 - 수정 이런 ui 다른 공통 컴포넌트로 빼기

const MyProfile: React.FC = () => {
  const username = 'hyna'

  return (
    <div>
      <Typography>프로필</Typography>
      {/* <Typography>소개</Typography>
      <Typography>수정</Typography> */}
      <ProfileSection title="소개">
        {/* 프로필 이미지, 유저 이름, 소속(42?), 아이디, 이메일 표시 컴포넌트 */}
        <ProfileCard
          profileImageURL={userInfo.profileImageUrl}
          username={username}
          association={userInfo?.association}
          userId={userInfo.userId}
          email={userInfo.email}
        />
      </ProfileSection>
      <div>biography</div>
      <div>achievements</div>
      <div>skills</div>
      {userInfo.linkList.map((link, i) => (
        <div key={link}>
          <Box
            key={link}
            component="img"
            src={`https://www.google.com/s2/favicons?domain=${link}`}
          />
          <a href={link}>link {i + 1}</a>
        </div>
      ))}
    </div>
  )
}

export default MyProfile
