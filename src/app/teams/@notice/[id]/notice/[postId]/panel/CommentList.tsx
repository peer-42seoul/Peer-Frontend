'use client'
import { ReactNode, FormEvent, useState } from 'react'
import { Avatar, Divider, IconButton, Stack, Typography } from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined'
import EditIcon from '@mui/icons-material/Edit'
import CuTextField from '@/components/CuTextField'
import CuButton from '@/components/CuButton'

const CommentCotainer = ({ children }: { children: ReactNode }) => {
  return (
    <Stack width={'100%'}>
      <Typography>댓글</Typography>
      {children}
    </Stack>
  )
}

interface CommentEditFormProps {
  commentId: number
  postId: number
  initialComment: string
  setEditMode: (isEditMode: boolean) => void
}

const CommentEditForm = ({
  commentId,
  postId,
  initialComment,
  setEditMode,
}: CommentEditFormProps) => {
  const handleEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const comment = formData.get('comment') as string
    alert(
      '#' + postId + ' Comment #' + commentId + " Edited: '" + comment + "'",
    )
    setEditMode(false)
  }

  return (
    <form onSubmit={handleEdit}>
      <Stack spacing={1} alignItems={'flex-end'}>
        <CuTextField
          placeholder={'댓글을 작성해주세요.'}
          fullWidth
          name={'comment'}
          id={'comment'}
          defaultValue={initialComment}
          multiline
        />
        <Stack direction={'row'} spacing={1}>
          <CuButton
            message={'취소'}
            action={() => setEditMode(false)}
            variant={'outlined'}
          />
          <CuButton message={'수정'} type={'submit'} variant={'contained'} />
        </Stack>
      </Stack>
    </form>
  )
}

interface CommentProps {
  commentId: number
  postId: number
  avatar: string
  name: string
  content: string
  date: string
  isMine: boolean
}

const Comment = ({
  avatar,
  name,
  content,
  date,
  isMine,
  postId,
  commentId,
}: CommentProps) => {
  const [isEditMode, setEditMode] = useState(false)

  const handleDelete = () => {
    alert('Delete comment #' + commentId)
  }
  const handleEdit = () => {
    setEditMode(true)
  }

  return (
    <Stack>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'flex-start'}
        >
          <Avatar alt="comment profile" src={avatar} />
          <Typography>{name}</Typography>
        </Stack>
        {isMine && !isEditMode ? (
          <Stack
            direction={'row'}
            alignItems={'center'}
            divider={
              <Divider orientation="vertical" variant="middle" flexItem />
            }
          >
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteOutlinedIcon />
            </IconButton>
          </Stack>
        ) : null}
      </Stack>
      {isEditMode ? (
        <CommentEditForm
          commentId={commentId}
          postId={postId}
          initialComment={content}
          setEditMode={setEditMode}
        />
      ) : (
        <>
          <Typography>{content}</Typography>
          <Typography>{date}</Typography>
        </>
      )}
    </Stack>
  )
}

const CommentForm = ({ postId }: { postId: number }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const comment = formData.get('comment') as string
    alert('#' + postId + " Comment: '" + comment + "'")
  }
  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={'row'}>
        <CuTextField
          placeholder={'댓글을 작성해주세요.'}
          fullWidth
          name={'comment'}
          id={'comment'}
        />
        <IconButton type={'submit'}>
          <InsertEmoticonOutlinedIcon />
        </IconButton>
      </Stack>
    </form>
  )
}

const CommentList = ({ postId }: { postId: number }) => {
  const dummy = {
    data: [
      {
        id: 1,
        avatar: 'https://picsum.photos/200',
        name: '닉네임',
        content: 'ㅋㅋ힘내세요. 이번주도 열심히! 화이팅!',
        date: '2023년 10월 03일 11:30 AM',
        isMine: true,
      },
      {
        id: 2,
        avatar: 'https://picsum.photos/200',
        name: '닉네임',
        content:
          'ㅋㅋ힘내세요. 이번주도 열심히! 화이팅!ㅋㅋ힘내세요. 이번주도 열심히! 화이팅!ㅋㅋ힘내세요. 이번주도 열심히! 화이팅!ㅋㅋ힘내세요. 이번주도 열심히! 화이팅!ㅋㅋ힘내세요. 이번주도 열심히! 화이팅!',
        date: '2023년 10월 03일 11:30 AM',
        isMine: true,
      },
      {
        id: 3,
        avatar: 'https://picsum.photos/200',
        name: '닉네임22',
        content: '맛있는 걸 먹으면 힘이 나요!',
        date: '2023년 10월 03일 11:30 AM',
        isMine: false,
      },
    ],
    loading: false,
    error: null,
  }

  const { data, loading, error } = dummy

  if (error || !data) {
    return (
      <CommentCotainer>
        <Typography>문제가 발생했습니다.</Typography>
      </CommentCotainer>
    )
  }

  if (loading) {
    return (
      <CommentCotainer>
        <Typography>로딩중...</Typography>
      </CommentCotainer>
    )
  }

  if (data.length === 0) {
    return (
      <CommentCotainer>
        <Typography>댓글이 없습니다.</Typography>
      </CommentCotainer>
    )
  }

  return (
    <CommentCotainer>
      <Stack>
        {data.map((comment) => (
          <Comment
            key={comment.id}
            postId={postId}
            commentId={comment.id}
            {...comment}
          />
        ))}
      </Stack>
      <CommentForm postId={postId} />
    </CommentCotainer>
  )
}

export default CommentList
