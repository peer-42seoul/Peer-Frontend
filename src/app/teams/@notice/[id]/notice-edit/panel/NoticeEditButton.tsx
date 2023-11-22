'use client'
import { useRouter } from 'next/navigation'
import { Stack, Button } from '@mui/material'

// NOTE : postId가 있으면 수정, 없으면 새로 작성
const NoticeEditButton = ({
  teamId,
  postId,
}: {
  teamId: string
  postId?: string
}) => {
  const router = useRouter()
  const handleGoBack = () => {
    if (postId) router.push(`/teams/${teamId}/notice/${postId}`)
    else router.push(`/teams/${teamId}/notice`)
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
