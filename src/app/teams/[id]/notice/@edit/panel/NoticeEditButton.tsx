'use client'
import { Stack, Button } from '@mui/material'
import useTeamPageState from '@/states/useTeamPageState'

// NOTE : postId가 있으면 수정, 없으면 새로 작성
const NoticeEditButton = ({ postId }: { postId?: string }) => {
  const { setNotice } = useTeamPageState()
  const handleGoBack = () => {
    if (postId) setNotice('DETAIL', parseInt(postId)) // 공지사항 수정
    else setNotice('LIST') // 공지사항 작성
  }
  return (
    <Stack direction={'row'} justifyContent={'flex-end'}>
      <Button onClick={handleGoBack} variant={'text'}>
        취소
      </Button>
      <Button type={'submit'} form={'notice-form'} variant={'contained'}>
        {postId ? '완료' : '등록'}
      </Button>
    </Stack>
  )
}

export default NoticeEditButton
