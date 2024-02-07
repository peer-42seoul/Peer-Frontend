import { FormEvent, useRef, useState } from 'react'
import { useSWRConfig } from 'swr'
import useAxiosWithAuth from '@/api/config'
import { CommentFormContainer } from '@/components/board/CommentPanel'
import useToast from '@/states/useToast'

interface ICommentFormProps {
  postId: number
  teamId: number
}

export const CommentForm = ({ postId, teamId }: ICommentFormProps) => {
  const axiosWithAuth = useAxiosWithAuth()
  const [isLoading, setIsLoading] = useState(false)
  const textRef = useRef<HTMLInputElement>()
  const { mutate } = useSWRConfig()
  const { openToast } = useToast()

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
        textRef.current && textRef.current.value && (textRef.current.value = '')
        mutate(`/api/v1/team/post/comment/${postId}`) // 댓글 데이터 만료
      })
      .catch(() => {
        openToast({ severity: 'error', message: '댓글 작성에 실패했습니다.' })
      })
  }

  return (
    <CommentFormContainer
      textRef={textRef}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  )
}
