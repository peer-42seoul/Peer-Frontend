'use client'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Stack, Typography } from '@mui/material'
import CommentList from './panel/CommentList'
import { ITeamNoticeDetail } from '@/types/TeamBoardTypes'
import axios from 'axios'
import useSWR from 'swr'
import dayjs from 'dayjs'

interface NoticeContentContainerProps {
  children: ReactNode
  isAuthor: boolean
  params: { id: string; postId: string }
}

const NoticeContentContainer = ({
  children,
  isAuthor,
  params,
}: NoticeContentContainerProps) => {
  const router = useRouter()
  const { id, postId } = params
  return (
    <Stack spacing={2} width={'100%'}>
      <Button
        onClick={() => router.push(`/teams/${id}/notice`)}
        variant={'text'}
      >
        이전 페이지
      </Button>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant="body2">공지사항</Typography>
        {isAuthor ? (
          <Button
            onClick={() => router.push(`/teams/${id}/notice-edit/${postId}`)}
            variant="text"
          >
            수정
          </Button>
        ) : null}
      </Stack>
      {children}
    </Stack>
  )
}

const TeamNoticeView = ({
  params,
}: {
  params: { id: string; postId: string }
}) => {
  const { postId, id } = params
  const router = useRouter()
  const { data, error, isLoading } = useSWR<ITeamNoticeDetail>(
    `/api/v1/team/notice/${postId}`,
    (url: string) => axios.get(url).then((res) => res.data),
  )

  const handleDelete = () => {
    const confirm = window.confirm('공지사항을 삭제하시겠습니까?')
    if (!confirm) return
    axios
      .delete(`/api/v1/team/notice/${postId}`)
      .then(() => {
        alert('공지사항을 삭제했습니다.')
        router.push(`/teams/${id}/notice`)
      })
      .catch(() => {
        alert('공지사항 삭제에 실패했습니다.')
      })
  }

  if (error || !data)
    return (
      <NoticeContentContainer isAuthor={!!data?.isAuthor} params={params}>
        <Typography>문제가 발생했습니다.</Typography>
      </NoticeContentContainer>
    )
  return (
    <Stack>
      <NoticeContentContainer isAuthor={data.isAuthor} params={params}>
        {isLoading ? (
          <Typography>로딩중...</Typography>
        ) : (
          <>
            <Stack spacing={1}>
              <Typography>제목</Typography>
              <Typography>{data.title}</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography>작성자</Typography>
              <Typography>{data.authorNickname}</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography>작성일</Typography>
              <Typography>
                {dayjs(data.createdAt).format('YYYY-MM-DD')}
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography>설명</Typography>
              <Typography>{data.content}</Typography>
            </Stack>
            <Stack alignItems={'flex-end'}>
              {data.isAuthor ? (
                <Button variant={'text'} color="warning" onClick={handleDelete}>
                  삭제
                </Button>
              ) : null}
            </Stack>
          </>
        )}
      </NoticeContentContainer>
      <CommentList postId={parseInt(postId)} teamId={parseInt(id)} />
    </Stack>
  )
}

export default TeamNoticeView
