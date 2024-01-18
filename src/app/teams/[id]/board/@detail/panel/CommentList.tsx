'use client'
import { FormEvent, useState } from 'react'
import useSWR from 'swr'
import { Stack } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import {
  CommentContainer,
  StatusMessage,
  CommentItem,
} from '@/components/board/CommentPanel'
import { ITeamBoardComment, ITeamComment } from '@/types/TeamBoardTypes'

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

const CommentList = ({ postId }: { postId: number }) => {
  const axiosWithAuth = useAxiosWithAuth()
  const { data, isLoading, error } = useSWR(
    `/api/v1/team/board/posts/comment/${postId}`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )

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
        {data.map((comment: ITeamBoardComment) => {
          // TODO : notice와 댓글 타입 통일 필요함....
          const transformComment: ITeamComment = {
            answerId: comment.commentId,
            authorImage: comment.authorImage,
            authorNickname: comment.authorNickname,
            content: comment.content,
            createdAt: comment.createdAt,
            isAuthor: comment.isAuthor,
          }
          return <Comment key={comment.commentId} comment={transformComment} />
        })}
      </CommentContainer>
    </Stack>
  )
}

export default CommentList
