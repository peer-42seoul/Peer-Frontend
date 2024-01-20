'use client'
import { FormEvent, useEffect, useState } from 'react'
import useAxiosWithAuth from '@/api/config'
import useTeamPageState from '@/states/useTeamPageState'
import useEditorState from '@/states/useEditorState'
import { EditForm } from '@/components/board/EditPanel'

interface IPostEditFormProps {
  boardId: number
  // teamId: string
  postId?: string
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
  useEffect(() => {
    if (postId) {
      setIsLoading(true)
      axiosWithAuth
        .get(`/api/v1/team-page/post/${postId}`)
        .then((res) => {
          if (!res || !res.data) throw new Error()
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
    console.log(formData.keys())
    const form = {
      title: formData.get('post-title') as string,
      content: editor.getMarkdown(),
    }
    if (!form.title) {
      alert('제목을 입력해주세요.')
      return
    }
    if (postId) {
      // 글 수정
      axiosWithAuth
        .put(`/api/v1/team/board/post/${postId}`, form)
        .then(() => {
          alert('게시글을 수정했습니다.')
          setBoard('DETAIL', boardId, parseInt(postId))
        })
        .catch(() => {
          alert('게시글 수정에 실패했습니다.')
        })
    }
    // 글 작성
    axiosWithAuth
      .post(`/api/v1/team-page/posts/create`, {
        ...form,
        boardId,
        image: null,
      })
      .then((res) => {
        alert('게시글이 등록되었습니다.')
        setBoard('DETAIL', boardId, res.data.postId)
      })
      .catch(() => {
        alert('게시글 작성에 실패했습니다.')
      })
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
