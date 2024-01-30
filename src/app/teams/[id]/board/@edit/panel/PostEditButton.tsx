'use client'
import useTeamPageState from '@/states/useTeamPageState'
import { EditButton } from '@/components/board/EditPanel'

// NOTE : postId가 있으면 수정, 없으면 새로 작성
const PostEditButton = ({ postId }: { postId?: number }) => {
  const { boardId, setBoard } = useTeamPageState()
  const handleGoBack = () => {
    if (!boardId) return null
    if (postId) setBoard('DETAIL', boardId, postId) // 게시글 수정
    else setBoard('LIST', boardId) // 게시글 작성
  }
  return (
    <EditButton
      type={postId ? 'edit' : 'new'}
      formId={'post-edit-form'}
      handleGoBack={handleGoBack}
    />
  )
}

export default PostEditButton
