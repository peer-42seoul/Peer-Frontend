import useAxiosWithAuth from '@/api/config'
import useToast from '@/states/useToast'
import { CommentProps } from '@/types/IComment'
import { ChangeEvent, useState } from 'react'
import { mutate } from 'swr'

const useComment = ({ data, postId }: CommentProps) => {
  const axiosWithAuth = useAxiosWithAuth()
  const [newContent, setNewContent] = useState(data.content)
  const [isEdit, setIsEdit] = useState(false)
  const { openToast, closeToast } = useToast()

  const onChangeContent = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewContent(event.target.value)
  }

  const onDeleteComment = async () => {
    try {
      await axiosWithAuth.delete(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase/comment/${data.commentId}`,
      )
      closeToast()
      mutate(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase/comment/${postId}?page=1&pageSize=3`,
      )
    } catch (error: any) {
      handleError(error, openToast)
    }
  }
  const onEditComment = async (commentId: number) => {
    if (!newContent) {
      openToast({
        severity: 'error',
        message: '댓글을 작성해주세요.',
      })
      return
    }
    try {
      await axiosWithAuth.put(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase/comment/${commentId}`,
        { content: newContent },
      )
      setIsEdit(false)
      openToast({
        severity: 'success',
        message: '댓글을 수정했습니다.',
      })
      mutate(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase/comment/${postId}?page=1&pageSize=3`,
      )
    } catch (error: any) {
      handleError(error, openToast)
    }
  }

  const handleError = (error: any, openToast: any) => {
    switch (error.response.status) {
      case 401: {
        openToast({
          severity: 'error',
          message: '잘못된 접근입니다.',
        })
        break
      }
      case 403: {
        openToast({
          severity: 'error',
          message: '접근이 거부되었습니다.',
        })
        break
      }
      case 404: {
        openToast({
          severity: 'error',
          message: '존재하지 않는 댓글입니다.',
        })
        break
      }
      default:
        openToast({
          severity: 'error',
          message: '알 수 없는 에러가 발생했습니다.',
        })
        break
    }
  }
  return {
    isEdit,
    setIsEdit,
    newContent,
    onChangeContent,
    onDeleteComment,
    onEditComment,
  }
}

export default useComment
