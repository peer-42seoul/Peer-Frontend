import { Typography, Button } from '@mui/material'
import { fetchServerData } from '@/api/fetchers'
import UserInfoEdit from './panel/UserInfoEdit'

const PrivacyPage = async () => {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/info`
  const data = await fetchServerData(API_URL)

  if (!data) return <Typography>데이터가 없습니다</Typography>

  const { name, email, local, authentication } = data
  return (
    <>
      <Typography>이름</Typography>
      <Typography>{name}</Typography>
      <Typography>이메일</Typography>
      <Typography>{email}</Typography>
      <UserInfoEdit local={local} authentication={authentication} />
      <Typography>계정관리</Typography>
      <Button>계정삭제</Button>
    </>
  )
}

export default PrivacyPage
