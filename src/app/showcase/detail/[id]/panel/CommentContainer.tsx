import useAxiosWithAuth from '@/api/config'
import CuCircularProgress from '@/components/CuCircularProgress'
import { IComment, IPostId } from '@/types/IComment'
import { Container, Stack, Typography } from '@mui/material'
import React from 'react'
import useSWR, { mutate } from 'swr'
import { CommentWriter } from './CommentWriter'
import * as style from './CommentContainer.style'
import CommentItem from './CommentItem'

const CommentContainer = ({ postId }: IPostId) => {
  const axiosWithAuth = useAxiosWithAuth()
  const { data, isLoading, error } = useSWR<IComment[]>(
    `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase/comment/${postId}?page=1&pageSize=3`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
    { shouldRetryOnError: false },
  )
  if (isLoading) return <CuCircularProgress color={'secondary'} />
  if (error) {
    if (error.response && error.response.status === 404) {
      return (
        <Typography color={'error'}>{error.response.data.message}</Typography>
      )
    }
    return (
      <>
        <Container sx={style.containerWrapper}>
          <Stack sx={style.CommentContainer}>
            <Typography
              variant={'Title3'}
              color={'text.normal'}
              marginBottom={'1rem'}
            >
              댓글
            </Typography>
            <Typography color={'error'}>에러가 발생했습니다.</Typography>
          </Stack>
        </Container>
      </>
    )
  }
  return (
    <>
      <Container component={'section'} sx={style.containerWrapper}>
        <Stack sx={style.CommentContainer}>
          <Typography
            variant={'Title3'}
            color={'text.normal'}
            marginBottom={'1rem'}
          >
            댓글
          </Typography>
          <Stack component={'section'} gap={'1rem'}>
            {/* 댓글 내용 */}
            {data?.map((comment: IComment) => (
              <CommentItem
                key={comment.commentId}
                data={comment}
                postId={postId}
              />
            ))}
          </Stack>
        </Stack>
        {/* 댓글 입력창 */}
        <CommentWriter postId={postId} mutate={mutate} />
      </Container>
    </>
  )
}

export default CommentContainer
