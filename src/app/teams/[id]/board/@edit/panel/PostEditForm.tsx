'use client'
import { FormEvent, useEffect, useState } from 'react'
import useAxiosWithAuth from '@/api/config'
import useTeamPageState from '@/states/useTeamPageState'
import useEditorState from '@/states/useEditorState'
import { EditForm } from '@/components/board/EditPanel'
import useToast from '@/states/useToast'

interface IPostEditFormProps {
  boardId: number
  postId?: number
}

const PostEditForm = ({ postId, boardId }: IPostEditFormProps) => {
  const axiosWithAuth = useAxiosWithAuth()
  const { setBoard } = useTeamPageState()
  const [previousData, setPreviousData] = useState({
    title: '',
    content: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const { editor } = useEditorState()
  const { openToast } = useToast()
  useEffect(() => {
    if (postId) {
      setIsLoading(true)
      axiosWithAuth
        .get(`/api/v1/team-page/post/${postId}`)
        .then((res) => {
          if (!res?.data) throw new Error()
          setPreviousData({
            title: res.data.title,
            content: res.data.content,
          })
        })
        .catch(() => {
          alert('게시글을 불러오는데 실패했습니다.')
          setBoard('LIST', boardId)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [postId])
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editor) return
    const formData = new FormData(event.currentTarget)
    const form = {
      title: formData.get('post-title') as string,
      content: editor.getMarkdown(),
      image: null,
    }
    if (!form.title) {
      openToast({
        severity: 'error',
        message: '제목을 입력해주세요.',
      })
      return
    }
    if (postId) {
      // 글 수정
      axiosWithAuth
        .put(`/api/v1/team/post/${postId}`, form)
        .then(() => {
          alert('게시글을 수정했습니다.')
          setBoard('DETAIL', boardId, postId)
        })
        .catch(() => {
          openToast({
            severity: 'error',
            message: '게시글 수정에 실패했습니다.',
          })
        })
    } else {
      // 글 작성
      axiosWithAuth
        .post(`/api/v1/team-page/posts/create`, {
          ...form,
          boardId,
          image: null,
        })
        .then((res) => {
          alert('게시글이 등록되었습니다.')
          setBoard('DETAIL', res.data.boardId, res.data.postId)
        })
        .catch(() => {
          openToast({
            severity: 'error',
            message: '게시글 작성에 실패했습니다.',
          })
        })
    }
  }

  return (
    <EditForm
      formId={'post-edit-form'}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      initialTitle={previousData.title || ''}
      initialContent={previousData.content || ''}
    />
  )
}

export default PostEditForm
