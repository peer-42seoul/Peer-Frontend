'use client'
import useTeamPageState from '@/states/useTeamPageState'
import { EditButton } from '@/components/board/EditPanel'

// NOTE : postId가 있으면 수정, 없으면 새로 작성
const NoticeEditButton = ({ postId }: { postId?: string }) => {
  const { setNotice } = useTeamPageState()
  const handleGoBack = () => {
    if (postId) setNotice('DETAIL', parseInt(postId)) // 공지사항 수정
    else setNotice('LIST') // 공지사항 작성
  }
  return (
    <EditButton
      type={postId ? 'edit' : 'new'}
      formId={'notice-form'}
      handleGoBack={handleGoBack}
    />
  )
}

export default NoticeEditButton
