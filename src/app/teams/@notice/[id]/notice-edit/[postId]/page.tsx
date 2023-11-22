'use client'
import NoticeEditContainer from '../panel/NoticeEditContainer'
import NoticeEditForm from '../panel/NoticeEditForm'

const NoticeEdit = ({ postId }: { postId: string }) => {
  console.log('NoticeEdit : ', postId)
  return (
    <NoticeEditContainer title={'공지사항 수정'}>
      <NoticeEditForm postId={postId} />
    </NoticeEditContainer>
  )
}

export default NoticeEdit
