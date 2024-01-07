'use client'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Stack, Typography, OutlinedInput } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import DynamicToastEditor from '@/components/DynamicToastEditor'

const NoticeEditForm = ({
  teamId,
  postId,
}: {
  teamId: string
  postId?: string
}) => {
  const axiosWithAuth = useAxiosWithAuth()
  const router = useRouter()
  const [previousData, setPreviousData] = useState({
    title: '',
    content: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (postId) {
      setIsLoading(true)
      axiosWithAuth
        .get(`/api/v1/team/notice/${postId}`)
        .then((res) => {
          if (!res || !res.data) throw new Error()
          setPreviousData({
            title: res.data.title,
            content: res.data.content,
          })
        })
        .catch(() => {
          alert('게시글을 불러오는데 실패했습니다.')
          router.back()
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [postId])
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const form = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    }
    if (postId) {
      // 글 수정
      axiosWithAuth
        .put(`/api/v1/team/notice/${postId}`, form)
        .then(() => {
          alert('공지사항을 수정했습니다.')
          router.push(`/teams/${teamId}/notice/${postId}`)
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
        router.push(`/teams/${teamId}/notice/${res.data.postId}`)
      })
      .catch(() => {
        alert('공지사항 작성에 실패했습니다.')
      })
  }

  return (
    <Stack>
      <form onSubmit={handleSubmit} id={'notice-form'}>
        <Stack>
          <Typography>제목</Typography>
          <OutlinedInput
            disabled={isLoading}
            name={'title'}
            placeholder={'제목을 입력해주세요.'}
            defaultValue={previousData?.title ? previousData.title : ''}
          />
        </Stack>
        <Stack>
          <Typography>내용</Typography>
          <DynamicToastEditor
            initialValue={previousData?.content ? previousData.content : ''}
          />
        </Stack>
      </form>
    </Stack>
  )
}

export default NoticeEditForm
