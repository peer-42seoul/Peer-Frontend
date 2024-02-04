'use client'

import useTeamPageState from '@/states/useTeamPageState'
import { EditPage, EditBox } from '@/components/board/EditPanel'
import PostEditForm from './panel/PostEditForm'

const BoardEdit = ({ params }: { params: { id: string } }) => {
  const { boardId, postId, setBoard } = useTeamPageState()
  const { id } = params
  const type = postId ? 'edit' : 'new'
  const handleGoBack = () => {
    if (!boardId) return null
    if (postId) {
      setBoard('DETAIL', boardId, postId)
    } else {
      setBoard('LIST', boardId)
    }
  }
  // TODO : 에러처리 구체화
  if (!boardId) return null
  return (
    <EditPage
      type={type}
      handleGoBack={handleGoBack}
      title={postId ? '게시글 수정' : '게시글 작성'}
    >
      <EditBox>
        <PostEditForm
          teamId={id}
          boardId={boardId}
          postId={postId}
          type={type}
          handleGoBack={handleGoBack}
        />
      </EditBox>
    </EditPage>
  )
}

export default BoardEdit
