'use client'
import { FormEvent, useEffect, useState } from 'react'
import { Stack, Typography, OutlinedInput } from '@mui/material'

const NoticeEditForm = ({ postId }: { postId?: string }) => {
  const [previousData, setPreviousData] = useState({
    title: '',
    description: '',
  })
  useEffect(() => {
    console.log('postId: ', postId)
    // TODO 🐧 : postId가 있다면 이미 작성된 공지사항 정보 불러오기
    if (postId) {
      const dummy = {
        data: {
          title: '공지사항 제목이 들어오는 자리입니다.',
          description:
            '팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요. 팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.',
          isMine: true,
        },
        loading: false,
        error: null,
      }
      const { data, loading, error } = dummy
      if (error || !data) {
        alert('데이터를 불러오는 데 실패했습니다.')
        // TODO 🐧 : 공지사항 페이지로 이동?
      }
      setPreviousData({
        title: data.title,
        description: data.description,
      })
    }
  }, [postId])
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    alert(
      "Title: '" +
        title +
        "'\nDescription: '" +
        description +
        "'\n\n🐧 : 제출 기능 구현하기",
    )
  }
  return (
    <Stack>
      <form onSubmit={handleSubmit} id={'notice-form'}>
        <Stack>
          <Typography>제목</Typography>
          <OutlinedInput
            name={'title'}
            placeholder={
              previousData?.title ? previousData.title : '제목을 입력해주세요.'
            }
          />
        </Stack>
        <Stack>
          <Typography>내용</Typography>
          <OutlinedInput
            fullWidth
            name={'description'}
            placeholder={
              previousData?.description
                ? previousData.description
                : '내용을 입력해주세요.'
            }
            multiline
            rows={10}
          />
        </Stack>
      </form>
    </Stack>
  )
}

export default NoticeEditForm
