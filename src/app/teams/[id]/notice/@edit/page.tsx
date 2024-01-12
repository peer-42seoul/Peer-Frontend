'use client'

import useTeamPageState from '@/states/useTeamPageState'
import NoticeEditContainer from './panel/NoticeEditContainer'
import NoticeEditForm from './panel/NoticeEditForm'
import NoticeEditButton from './panel/NoticeEditButton'

const NoticeEdit = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const { postId } = useTeamPageState()
  return (
    <NoticeEditContainer title={postId ? '공지사항 수정' : '공지사항 작성'}>
      <NoticeEditForm teamId={id} />
      <NoticeEditButton />
    </NoticeEditContainer>
  )
}

export default NoticeEdit
