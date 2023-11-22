'use client'
import NoticeEditContainer from '../panel/NoticeEditContainer'
import NoticeEditForm from '../panel/NoticeEditForm'

const NoticeEdit = ({ params }: { params: { id: string; postId: string } }) => {
  const { id, postId } = params
  return (
    <NoticeEditContainer title={'공지사항 수정'}>
      <NoticeEditForm teamId={id} postId={postId} />
    </NoticeEditContainer>
  )
}

export default NoticeEdit
