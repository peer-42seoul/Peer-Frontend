'use client'

import useTeamPageState from '@/states/useTeamPageState'
import { EditPage, EditBox } from '@/components/board/EditPanel'
import NoticeEditForm from './panel/NoticeEditForm'
import NoticeEditButton from './panel/NoticeEditButton'

const NoticeEdit = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const { postId } = useTeamPageState()
  return (
    <EditPage title={postId ? '공지사항 수정' : '공지사항 작성'}>
      <EditBox>
        <NoticeEditForm teamId={id} />
        <NoticeEditButton />
      </EditBox>
    </EditPage>
  )
}

export default NoticeEdit
