import NoticeEditContainer from './panel/NoticeEditContainer'
import NoticeEditForm from './panel/NoticeEditForm'
import NoticeEditButton from './panel/NoticeEditButton'

const NoticeEdit = ({ params }: { params: { id: string } }) => {
  const { id } = params
  return (
    <NoticeEditContainer title={'공지사항 작성'}>
      <NoticeEditForm teamId={id} />
      <NoticeEditButton teamId={id} />
    </NoticeEditContainer>
  )
}

export default NoticeEdit
