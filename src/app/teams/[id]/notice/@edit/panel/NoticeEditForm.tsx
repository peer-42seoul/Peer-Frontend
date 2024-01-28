'use client'
import { FormEvent, useEffect, useState } from 'react'
import useAxiosWithAuth from '@/api/config'
import useTeamPageState from '@/states/useTeamPageState'
import useEditorState from '@/states/useEditorState'
import { EditForm } from '@/components/board/EditPanel'

const NoticeEditForm = ({
  teamId,
  postId,
}: {
  teamId: string
  postId?: string
}) => {
  const axiosWithAuth = useAxiosWithAuth()
  const { setNotice } = useTeamPageState()
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
        .get(`/api/v1/team/notice/${postId}`)
        .then((res) => {
          if (!res?.data) throw new Error()
          setPreviousData({
            title: res.data.title,
            content: res.data.content,
          })
        })
        .catch(() => {
          alert('게시글을 불러오는데 실패했습니다.')
          setNotice('LIST')
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
      title: formData.get('title') as string,
      content: editor.getMarkdown(),
    }
    if (postId) {
      // 글 수정
      axiosWithAuth
        .put(`/api/v1/team/notice/${postId}`, form)
        .then(() => {
          alert('공지사항을 수정했습니다.')
        })
        .catch(() => {
          alert('공지사항 수정에 실패했습니다.')
        })
    }
    // 글 작성
    axiosWithAuth
      .post(`/api/v1/team/notice`, {
        ...form,
        teamId,
      })
      .then((res) => {
        alert('공지사항이 등록되었습니다.')
        setNotice('DETAIL', res.data.postId)
      })
      .catch(() => {
        alert('공지사항 작성에 실패했습니다.')
      })
  }

  return (
    <EditForm
      formId={'notice-form'}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      initialTitle={previousData.title || ''}
      initialContent={previousData.content || ''}
    />
  )
}

export default NoticeEditForm
