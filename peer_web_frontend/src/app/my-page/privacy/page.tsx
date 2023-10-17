import { Typography, Button } from '@mui/material'
import { fetchServerData } from '@/api/fetchers'
import ModifyInfoModal from './panel/ModifyInfoModal'

const PrivacyPage = async () => {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/info`
  const data = await fetchServerData(API_URL)

  if (!data) return <Typography>데이터가 없습니다</Typography>

  const { name, email, local, authentication } = data
  return (
    <>
      <Typography>이름</Typography>
      <Typography>{name}</Typography>
      <Typography>이메일</Typography>
      <Typography>{email}</Typography>
      <Typography>계정</Typography>
      <ModifyInfoModal />
      <Typography>지역</Typography>
      {local ? (
        <Typography>{local}</Typography>
      ) : (
        <Typography>인증 전</Typography>
      )}
      <Typography>42계정</Typography>
      {authentication ? (
        <Typography>{authentication}</Typography>
      ) : (
        <Typography>인증 전</Typography>
      )}
      <Typography>비밀번호</Typography>
      <Button>비밀번호 변경</Button>
      <Typography>계정관리</Typography>
      <Button>계정삭제</Button>
    </>
  )
}

export default PrivacyPage
