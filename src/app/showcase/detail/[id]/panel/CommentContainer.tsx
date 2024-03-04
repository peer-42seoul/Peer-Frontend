import useAxiosWithAuth from '@/api/config'
import CuAvatar from '@/components/CuAvatar'
import CuCircularProgress from '@/components/CuCircularProgress'
import CuTextModal from '@/components/CuTextModal'
import useModal from '@/hook/useModal'
import { CommentProps, IComment, IPostId } from '@/types/IComment'
import { Box, Container, Stack, Typography, TextField } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import useSWR, { mutate } from 'swr'
import { CommentWriter } from './CommentWriter'
import useToast from '@/states/useToast'
import * as style from './CommentContainer.style'
import OthersProfile from '@/app/panel/OthersProfile'
import { CommentMoreDropdownMenu } from '@/components/board/CommentPanel'
import CuButton from '@/components/CuButton'

const Comment = ({ data, postId }: CommentProps) => {
  const axiosWithAuth = useAxiosWithAuth()
  const { closeModal, openModal, isOpen } = useModal()
  const [isEdit, setIsEdit] = useState(false)
  const { openToast, closeToast } = useToast()
  const [newContent, setNewContent] = useState(data.content)

  const onChangeContent = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewContent(event.target.value)
  }

  const onDeleteComment = async () => {
    try {
      await axiosWithAuth.delete(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase/comment/${data.commentId}`,
      )
      closeToast()
      mutate(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase/comment/${postId}?page=1&pageSize=3`,
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
  const onEditComment = async (commentId: number) => {
    if (!newContent) {
      openToast({
        severity: 'error',
        message: '댓글을 작성해주세요.',
      })
      return
    }
    try {
      await axiosWithAuth.put(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase/comment/${commentId}`,
        { content: newContent },
      )
      setIsEdit(false)
      openToast({
        severity: 'success',
        message: '댓글을 수정했습니다.',
      })
      mutate(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase/comment/${postId}?page=1&pageSize=3`,
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
      <Stack sx={style.commentListContainer}>
        <Box sx={style.isEditContainer}>
          <Box sx={style.commenterInfo}>
            <OthersProfile
              userId={data.authorId.toString()}
              name={data.authorNickname}
            >
              <CuAvatar
                key={data.commentId}
                src={data.authorImage ?? undefined}
                sx={style.avatarStyle}
              />
            </OthersProfile>
            <Typography variant="Caption" color={'text.alternative'}>
              {data.authorNickname}
            </Typography>
          </Box>
          {isEdit ? (
            <Stack alignItems={'flex-end'}>
              <TextField
                type="text"
                id="content"
                defaultValue={newContent}
                fullWidth
                onChange={(event) => onChangeContent(event)}
                placeholder="댓글을 작성해주세요."
                style={{
                  color: 'text.alternative',
                  width: '100%',
                }}
                inputProps={{ maxLength: 150, style: { padding: '1rem' } }}
              />
              <Stack direction={'row'} spacing={1} style={{ marginTop: '8px' }}>
                <CuButton
                  message={'취소'}
                  action={() => setIsEdit(false)}
                  variant={'outlined'}
                />
                <CuButton
                  action={() => onEditComment(data.commentId)}
                  message={'수정'}
                  type={'submit'}
                  variant={'contained'}
                />
              </Stack>
            </Stack>
          ) : (
            <>
              <Typography variant="Body2" color={'text.normal'}>
                {data.content}
              </Typography>
              <Typography variant="Tag" color={'text.assistive'}>
                {data.createAt
                  .split('T')[0]
                  .replace(/-/g, '월 ')
                  .replace('월 ', '년 ') + '일'}
              </Typography>
            </>
          )}
        </Box>
        {!isEdit && data.isAuthor && (
          <Box sx={style.iconContainer}>
            <CommentMoreDropdownMenu
              handleDelete={() => openModal()}
              setEditMode={() => setIsEdit(true)}
            />
          </Box>
        )}
        <CuTextModal
          open={isOpen}
          onClose={closeModal}
          title={'댓글을 삭제할까요?'}
          content={'댓글을 삭제하면 복구할 수 없어요.'}
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
      <Container sx={style.containerWrapper}>
        <Stack sx={style.CommentContainer}>
          <Typography
            variant={'Title3'}
            color={'text.normal'}
            marginBottom={'1rem'}
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
