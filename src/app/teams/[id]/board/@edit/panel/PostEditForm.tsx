'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { Editor } from '@toast-ui/editor'
import useAxiosWithAuth from '@/api/config'
import useTeamPageState from '@/states/useTeamPageState'
import useToast from '@/states/useToast'
import { EditForm } from '@/components/board/EditPanel'
import { IBoardEditFormType } from '@/types/TeamBoardTypes'

const PostEditForm = ({
  postId,
  boardId,
  type,
  handleGoBack,
}: IBoardEditFormType) => {
  const axiosWithAuth = useAxiosWithAuth()
  const { setBoard } = useTeamPageState()
  const [previousData, setPreviousData] = useState({
    title: '',
    content: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const { openToast } = useToast()
  const titleRef = useRef<HTMLInputElement | null>(null)
  const editorRef = useRef<Editor | null>(null)
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
    if (!editorRef.current || !titleRef.current) return
    const form = {
      title: titleRef.current.value,
      content: editorRef.current.getMarkdown(),
      image: null,
    }
    if (!form.title || !form.content) {
      openToast({
        severity: 'error',
        message: '제목과 내용을 입력해주세요.',
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
      isLoading={isLoading}
      onSubmit={handleSubmit}
      titleRef={titleRef}
      editorRef={editorRef}
      initialData={previousData}
      type={type}
      handleGoBack={handleGoBack}
    />
  )
}

export default PostEditForm
