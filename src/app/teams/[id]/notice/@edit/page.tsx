'use client'

import useTeamPageState from '@/states/useTeamPageState'
import { EditPage, EditBox } from '@/components/board/EditPanel'
import NoticeEditForm from './panel/NoticeEditForm'
import NoticeEditButton from './panel/NoticeEditButton'
import useMedia from '@/hook/useMedia'

const NoticeEdit = ({ params }: { params: { id: string } }) => {
  const { postId, setNotice } = useTeamPageState()
  const { isPc } = useMedia()
  const { id } = params
  const handleGoBack = () => {
    if (postId) {
      setNotice('DETAIL', postId)
    } else {
      setNotice('LIST')
    }
  }
  return (
    <EditPage
      isPc={isPc}
      type={postId ? 'edit' : 'new'}
      handleGoBack={handleGoBack}
      title={postId ? '공지사항 수정' : '공지사항 작성'}
    >
      <EditBox>
        <NoticeEditForm teamId={id} />
        {isPc && <NoticeEditButton />}
      </EditBox>
    </EditPage>
  )
}

export default NoticeEdit
