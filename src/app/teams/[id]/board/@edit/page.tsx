'use client'

import useTeamPageState from '@/states/useTeamPageState'
import { EditPage, EditBox } from '@/components/board/EditPanel'
import PostEditForm from './panel/PostEditForm'
import PostEditButton from './panel/PostEditButton'
import useMedia from '@/hook/useMedia'

const BoardEdit = () => {
  const { boardId, postId, setBoard } = useTeamPageState()
  const { isPc } = useMedia()
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
      type={postId ? 'edit' : 'new'}
      handleGoBack={handleGoBack}
      title={postId ? '게시글 수정' : '게시글 작성'}
    >
      <EditBox>
        <PostEditForm boardId={boardId} postId={postId} />
        {isPc && <PostEditButton postId={postId} />}
      </EditBox>
    </EditPage>
  )
}

export default BoardEdit
