import { Box } from '@mui/material'
import React from 'react'
import { UserProfile } from '@/types/UserProfile'

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

const MyProfile: React.FC = () => {
  const username = 'hyna'

  return (
    <div>
      <h3>프로필</h3>
      <b>소개</b>
      <p>관리</p>
      <Box component="img" src={userInfo.profileImageUrl} />
      <b>{username}</b>
      {userInfo?.association ? <p>{userInfo.association}</p> : <p />}
      <p>
        {userInfo.userId}({userInfo.email})
      </p>
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
