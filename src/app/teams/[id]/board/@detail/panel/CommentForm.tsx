import { FormEvent, useState } from 'react'
import { useSWRConfig } from 'swr'
import useAxiosWithAuth from '@/api/config'
import { CommentFormContainer } from '@/components/board/CommentPanel'

interface ICommentFormProps {
  postId: number
  teamId: number
}

export const CommentForm = ({ postId, teamId }: ICommentFormProps) => {
  const axiosWithAuth = useAxiosWithAuth()
  const [isLoading, setIsLoading] = useState(false)
  const { mutate } = useSWRConfig()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    axiosWithAuth
      .post('/api/v1/team/post/comment/', {
        teamId: teamId,
        postId: postId,
        content: formData.get('new-content') as string,
      })
      .then(() => {
        setIsLoading(false)
        mutate(`/api/v1/team/post/comment/${postId}?page=1&pageSize=100`) // 댓글 데이터 만료
      })
      .catch(() => {
        alert('댓글 작성에 실패했습니다.')
      })
  }

  return (
    <CommentFormContainer handleSubmit={handleSubmit} isLoading={isLoading} />
  )
}
