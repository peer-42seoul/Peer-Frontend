import useAxiosWithAuth from '@/api/config'
import CuAvatar from '@/components/CuAvatar'
import CuCircularProgress from '@/components/CuCircularProgress'
import CuTextModal from '@/components/CuTextModal'
import useModal from '@/hook/useModal'
import { TrashIcon } from '@/icons'
import { CommentProps, IComment, IPostId } from '@/types/IComment'
import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import React from 'react'
import useSWR, { mutate } from 'swr'
import { CommentWriter } from './CommentWriter'
import useToast from '@/states/useToast'

const Comment = ({ data, postId }: CommentProps) => {
  const theme = useTheme()
  const axiosWithAuth = useAxiosWithAuth()
  const { isOpen: alertOpen, closeModal, openModal } = useModal()
  const { openToast, closeToast } = useToast()

  const onDeleteComment = async () => {
    try {
      await axiosWithAuth.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/comment/${data.commentId}`,
      )
      closeToast()
      mutate(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/post/comment/${postId}?page=1&pageSize=3`,
      )
    } catch (error: any) {
      switch (error.response.status) {
        case 401: {
          openToast({
            severity: 'error',
            message: '접근이 거부되었습니다.',
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
  }

  return (
    <>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: 'auto',
          gap: '1rem',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              marginBottom: '0.25rem',
              alignItems: 'center',
              gap: '0.38rem',
            }}
          >
            <CuAvatar
              key={data.commentId}
              src={data.authorImage ?? undefined}
              sx={{ width: '1.5rem', height: '1.5rem' }}
            />
            <Typography variant="Caption" color={'text.alternative'}>
              {data.authorNickname}
            </Typography>
          </Box>
          <Typography variant="Body2" color={'text.normal'}>
            {data.content}
          </Typography>
          <Typography variant="Tag" color={'text.assistive'}>
            {data.createAt
              .split('T')[0]
              .replace(/-/g, '월 ')
              .replace('월 ', '년 ') + '일'}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <IconButton onClick={openModal}>
            <TrashIcon
              sx={{
                width: '1.2rem',
                height: '1.25rem',
                color: alpha(theme.palette.text.assistive, 0.5),
              }}
            />
          </IconButton>
          {/* <IconButton onClick={openModal}>
            <EditIcon
              sx={{
                width: '1.2rem',
                height: '1.25rem',
                color: alpha(theme.palette.text.assistive, 0.5),
              }}
            />
          </IconButton> */}
        </Box>
        <CuTextModal
          open={alertOpen}
          onClose={closeModal}
          title={'경고'}
          content={'정말로 삭제하시겠어요?'}
          containedButton={{
            text: '삭제',
            onClick: onDeleteComment,
          }}
          textButton={{
            text: '취소',
            onClick: closeModal,
          }}
        />
      </Stack>
    </>
  )
}

const CommentContainer = ({ postId }: IPostId) => {
  const axiosWithAuth = useAxiosWithAuth()
  const { data, isLoading, error } = useSWR<IComment[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/post/comment/${postId}?page=1&pageSize=3`,
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
    return <Typography color={'error'}>에러가 발생했습니다.</Typography>
  }
  return (
    <>
      <Container
        sx={{
          width: '100%',
          height: 'auto',
        }}
      >
        <Stack
          sx={{
            padding: '1.5rem',
            borderRadius: '0.75rem 0.7rem 0 0',
            backgroundColor: 'background.secondary',
          }}
        >
          <Typography
            variant={'Title1'}
            color={'text.normal'}
            sx={{ marginBottom: '1rem' }}
          >
            댓글
          </Typography>
          <Stack gap={'1rem'}>
            {data?.map((comment: IComment) => (
              <Comment key={comment.commentId} data={comment} postId={postId} />
            ))}
          </Stack>
        </Stack>
        <CommentWriter postId={postId} mutate={mutate} />
      </Container>
    </>
  )
}

export default CommentContainer
