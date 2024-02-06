'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { isAxiosError } from 'axios'
import { Editor } from '@toast-ui/editor'
import useAxiosWithAuth from '@/api/config'
import useTeamPageState from '@/states/useTeamPageState'
import useToast from '@/states/useToast'
import { EditForm } from '@/components/board/EditPanel'
import { IEditFormType } from '@/types/TeamBoardTypes'

const NoticeEditForm = ({
  teamId,
  postId,
  type,
  handleGoBack,
}: IEditFormType) => {
  const axiosWithAuth = useAxiosWithAuth()
  const { setNotice } = useTeamPageState()
  const [previousData, setPreviousData] = useState({
    title: '',
    content: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const titleRef = useRef<HTMLInputElement | null>(null)
  const editorRef = useRef<Editor | null>(null)
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
          alert('글을 불러오는데 실패했습니다.')
          setNotice('LIST')
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
          alert('공지사항을 수정했습니다.')
          setNotice('DETAIL', postId)
        })
        .catch((e: unknown) => {
          if (isAxiosError(e) && e.response?.status === 403) {
            openToast({
              severity: 'error',
              message: '공지사항 수정은 팀 리더와 작성자만 가능합니다.',
            })
          } else {
            openToast({
              severity: 'error',
              message: '공지사항 수정에 실패했습니다.',
            })
          }
        })
    } else {
      // 글 작성
      axiosWithAuth
        .post(`/api/v1/team-page/notice/create`, {
          ...form,
          teamId,
        })
        .then((res) => {
          alert('공지사항이 등록되었습니다.')
          setNotice('DETAIL', res.data.postId)
        })
        .catch((e: unknown) => {
          if (isAxiosError(e) && e.response?.status === 403) {
            openToast({
              severity: 'error',
              message: '공지사항 등록은 팀 리더와 작성자만 가능합니다.',
            })
          } else {
            openToast({
              severity: 'error',
              message: '공지사항 등록에 실패했습니다.',
            })
          }
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

export default NoticeEditForm
