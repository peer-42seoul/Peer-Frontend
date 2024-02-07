'use client'

import useTeamPageState from '@/states/useTeamPageState'
import { EditPage, EditBox } from '@/components/board/EditPanel'
import NoticeEditForm from './panel/NoticeEditForm'

const NoticeEdit = ({ params }: { params: { id: string } }) => {
  const { postId, setNotice } = useTeamPageState()
  const { id } = params
  const type = postId ? 'edit' : 'new'
  const handleGoBack = () => {
    if (postId) {
      setNotice('DETAIL', postId)
    } else {
      setNotice('LIST')
    }
  }
  return (
    <EditPage
      type={type}
      handleGoBack={handleGoBack}
      title={postId ? '공지사항 수정' : '공지사항 작성'}
    >
      <EditBox>
        <NoticeEditForm
          teamId={id}
          postId={postId}
          type={type}
          handleGoBack={handleGoBack}
        />
      </EditBox>
    </EditPage>
  )
}

export default NoticeEdit
