'use client'
import { ReactNode, FormEvent, useState } from 'react'
import { Avatar, Divider, IconButton, Stack, Typography } from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined'
import EditIcon from '@mui/icons-material/Edit'
import CuTextField from '@/components/CuTextField'
import CuButton from '@/components/CuButton'
import useSWR from 'swr'
import axios from 'axios'
import { ITeamComment } from '@/types/TeamBoardTypes'
import dayjs from 'dayjs'

interface ICommentProps {
  postId: number
  teamId: number
}

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
  initialComment: string
  setEditMode: (isEditMode: boolean) => void
}

const CommentEditForm = ({
  commentId,
  initialComment,
  setEditMode,
}: CommentEditFormProps) => {
  const handleEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    axios
      .put(`/api/v1/team/notice/answer/${commentId}`, {
        content: formData.get('content') as string,
      })
      .then(() => {
        alert('댓글을 수정했습니다.')
        setEditMode(false)
      })
      .catch(() => {
        alert('댓글 수정에 실패했습니다.')
      })
  }

  return (
    <form onSubmit={handleEdit}>
      <Stack spacing={1} alignItems={'flex-end'}>
        <CuTextField
          placeholder={'댓글을 작성해주세요.'}
          fullWidth
          name={'content'}
          id={'content'}
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

const Comment = ({
  answerId,
  authorImage,
  authorNickname,
  content,
  createdAt,
  isAuthor,
}: ITeamComment & { postId: number }) => {
  const [isEditMode, setEditMode] = useState(false)

  const handleDelete = () => {
    const confirm = window.confirm('댓글을 삭제하시겠습니까?')
    if (!confirm) return
    axios
      .delete(`/api/v1/team/notice/answer/${answerId}`)
      .then(() => {
        alert('댓글을 삭제했습니다.')
      })
      .catch(() => {
        alert('댓글 삭제에 실패했습니다.')
      })
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
          <Avatar alt="comment profile" src={authorImage} />
          <Typography>{authorNickname}</Typography>
        </Stack>
        {isAuthor && !isEditMode ? (
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
          commentId={answerId}
          initialComment={content}
          setEditMode={setEditMode}
        />
      ) : (
        <>
          <Typography>{content}</Typography>
          <Typography>
            {dayjs(createdAt).format('YYYY년 MM월 DD일 hh:mm A')}
          </Typography>
        </>
      )}
    </Stack>
  )
}

const CommentForm = ({ postId, teamId }: ICommentProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    axios
      .post('/api/v1/team/notice/answer', {
        teamId: teamId,
        postId: postId,
        content: formData.get('new-content') as string,
      })
      .then(() => {
        setIsLoading(false)
      })
      .catch(() => {
        alert('댓글 작성에 실패했습니다.')
      })
  }
  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={'row'}>
        <CuTextField
          placeholder={'댓글을 작성해주세요.'}
          fullWidth
          name={'new-content'}
          id={'new-content'}
        />
        <IconButton disabled={isLoading} type={'submit'}>
          <InsertEmoticonOutlinedIcon />
        </IconButton>
      </Stack>
    </form>
  )
}

const CommentList = ({ postId, teamId }: ICommentProps) => {
  const { data, isLoading, error } = useSWR(
    `/api/v1/team/notice/answer/${postId}`,
    (url: string) => axios.get(url).then((res) => res.data),
  )

  if (error || !data) {
    return (
      <CommentCotainer>
        <Typography>문제가 발생했습니다.</Typography>
      </CommentCotainer>
    )
  }

  if (isLoading) {
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
        {data.map((comment: ITeamComment) => (
          <Comment key={comment.answerId} postId={postId} {...comment} />
        ))}
      </Stack>
      <CommentForm postId={postId} teamId={teamId} />
    </CommentCotainer>
  )
}

export default CommentList
