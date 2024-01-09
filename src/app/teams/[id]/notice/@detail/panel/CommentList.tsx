'use client'
import { FormEvent, useState } from 'react'
import { Stack } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import { ITeamComment } from '@/types/TeamBoardTypes'
import {
  CommentContainer,
  StatusMessage,
  CommentItem,
  CommentFormContainer,
} from '@/components/board/CommentPanel'

const mockData = [
  {
    answerId: 1,
    authorImage: '/assets/images/profile.png',
    authorNickname: '작성자',
    content:
      '댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용',
    createdAt: '2021-10-10T10:10:10',
    isAuthor: true,
  },
  {
    answerId: 2,
    authorImage: '/assets/images/profile.png',
    authorNickname: '작성자',
    content: '댓글 내용',
    createdAt: '2021-10-10T10:10:10',
    isAuthor: true,
  },
  {
    answerId: 3,
    authorImage: '/assets/images/profile.png',
    authorNickname: '작성자',
    content: '댓글 내용',
    createdAt: '2021-10-10T10:10:10',
    isAuthor: true,
  },
  {
    answerId: 4,
    authorImage: '/assets/images/profile.png',
    authorNickname: '작성자',
    content: '댓글 내용',
    createdAt: '2021-10-10T10:10:10',
    isAuthor: true,
  },
  {
    answerId: 5,
    authorImage: '/assets/images/profile.png',
    authorNickname: '작성자',
    content: '댓글 내용',
    createdAt: '2021-10-10T10:10:10',
    isAuthor: true,
  },
  {
    answerId: 6,
    authorImage: '/assets/images/profile.png',
    authorNickname: '작성자',
    content: '댓글 내용',
    createdAt: '2021-10-10T10:10:10',
    isAuthor: true,
  },
  {
    answerId: 7,
    authorImage: '/assets/images/profile.png',
    authorNickname: '작성자',
    content: '댓글 내용',
    createdAt: '2021-10-10T10:10:10',
    isAuthor: true,
  },
]

interface ICommentProps {
  postId: number
  teamId: number
}

const Comment = ({ comment }: { comment: ITeamComment }) => {
  const [isEditMode, setEditMode] = useState(false)
  const axiosWithAuth = useAxiosWithAuth()

  const handleEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    axiosWithAuth
      .put(`/api/v1/team/notice/answer/${comment.answerId}`, {
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

  const handleDelete = () => {
    const confirm = window.confirm('댓글을 삭제하시겠습니까?')
    if (!confirm) return
    axiosWithAuth
      .delete(`/api/v1/team/notice/answer/${comment.answerId}`)
      .then(() => {
        alert('댓글을 삭제했습니다.')
      })
      .catch(() => {
        alert('댓글 삭제에 실패했습니다.')
      })
  }

  return (
    <CommentItem
      comment={comment}
      isEditMode={isEditMode}
      handleDelete={handleDelete}
      setEditMode={setEditMode}
      handleEdit={handleEdit}
    />
  )
}

const CommentForm = ({ postId, teamId }: ICommentProps) => {
  const axiosWithAuth = useAxiosWithAuth()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    axiosWithAuth
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
    <CommentFormContainer handleSubmit={handleSubmit} isLoading={isLoading} />
  )
}

const CommentList = ({ postId, teamId }: ICommentProps) => {
  const axiosWithAuth = useAxiosWithAuth()
  // const { data, isLoading, error } = useSWR(
  //   `/api/v1/team/notice/answer/${postId}`,
  //   (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  // )

  const isLoading = false
  const error = false
  const data = mockData
  // const data = []

  if (error || !data) {
    return <StatusMessage message={'댓글을 불러오는데 실패했습니다.'} />
  }

  if (isLoading) {
    return <StatusMessage message={'댓글을 불러오는 중입니다...'} />
  }

  if (data.length === 0) {
    return (
      <StatusMessage message={'댓글이 없습니다. 첫 댓글을 작성해보세요!'} />
    )
  }

  return (
    <Stack>
      <CommentContainer>
        {data.map((comment: ITeamComment) => (
          <Comment key={comment.answerId} postId={postId} comment={comment} />
        ))}
      </CommentContainer>
      <CommentForm postId={postId} teamId={teamId} />
    </Stack>
  )
}

export default CommentList
