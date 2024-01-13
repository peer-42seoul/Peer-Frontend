import { Box, IconButton, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import { TrashIcon, EditIcon, SendIcon } from '@/icons'
import { ITeamComment } from '@/types/TeamBoardTypes'
import * as style from './CommentPanel.style'
import { FormEvent } from 'react'
import CuAvatar from '../CuAvatar'
import dayjs from 'dayjs'
import CuTextField from '../CuTextField'
import CuButton from '../CuButton'

interface IChildrenProps {
  children: React.ReactNode
}

interface ICommentProps {
  comment: ITeamComment
  isEditMode: boolean
  handleDelete: (answerId: number) => void
  setEditMode: (isEditMode: boolean) => void
  handleEdit: (e: FormEvent<HTMLFormElement>) => void
}

export const CommentContainer = ({
  isPc,
  children,
}: IChildrenProps & { isPc: boolean }) => {
  return (
    <Stack
      sx={{
        ...style.CommentContainer,
        padding: isPc ? '1.5rem 2rem' : '1.5rem 1rem',
      }}
      spacing={'1rem'}
    >
      <Typography variant={'Title1'}>댓글</Typography>
      <Stack spacing={'1rem'}>{children}</Stack>
    </Stack>
  )
}

export const StatusMessage = ({ message }: { message: string }) => {
  return (
    <CommentContainer>
      <Typography
        textAlign={'center'}
        variant={'Body2'}
        color={'text.alternative'}
      >
        {message}
      </Typography>
    </CommentContainer>
  )
}

export const CommentItem = ({
  comment,
  isEditMode,
  handleDelete,
  setEditMode,
  handleEdit,
}: ICommentProps) => {
  return (
    <Stack direction={'row'} spacing={'1rem'}>
      {/* content */}
      <Stack sx={style.CommentContentWrapper}>
        <Stack
          sx={{ marginBottom: '0.25rem' }}
          spacing={'0.38rem'}
          direction={'row'}
          alignItems={'center'}
        >
          <CuAvatar sx={style.Avatar} src={comment.authorImage} />
          <Typography color={'text.alternative'} variant={'Caption'}>
            {comment.authorNickname}
          </Typography>
        </Stack>
        {isEditMode ? (
          <form onSubmit={handleEdit}>
            <Stack spacing={1} alignItems={'flex-end'}>
              <CuTextField
                placeholder={'댓글을 작성해주세요.'}
                fullWidth
                name={'content'}
                id={'content'}
                defaultValue={comment.content}
                multiline
              />
              <Stack direction={'row'} spacing={1}>
                <CuButton
                  message={'취소'}
                  action={() => setEditMode(false)}
                  variant={'outlined'}
                />
                <CuButton
                  message={'수정'}
                  type={'submit'}
                  variant={'contained'}
                />
              </Stack>
            </Stack>
          </form>
        ) : (
          <>
            <Typography variant={'Body2'}>{comment.content}</Typography>
            <Typography variant={'Tag'} color={'text.assistive'}>
              {dayjs(comment.createdAt).format('YYYY년 M월 D일 h:m A')}
            </Typography>
          </>
        )}
      </Stack>
      {/* icon button */}
      <Stack direction={'row'} spacing={'1rem'} alignItems={'flex-start'}>
        {!isEditMode && comment.isAuthor ? (
          <IconButton sx={style.IconButton} onClick={() => setEditMode(true)}>
            <EditIcon sx={style.Icon} />
          </IconButton>
        ) : (
          <Box sx={style.Icon} />
        )}
        {!isEditMode && comment.isAuthor ? (
          <IconButton
            sx={style.IconButton}
            onClick={() => handleDelete(comment.answerId)}
          >
            <TrashIcon sx={style.Icon} />
          </IconButton>
        ) : (
          <Box sx={style.Icon} />
        )}
      </Stack>
    </Stack>
  )
}

export const CommentFormContainer = ({
  isPc,
  handleSubmit,
  isLoading,
}: {
  isPc: boolean
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoading: boolean
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Stack
        sx={{
          ...style.CommentForm,
          padding: isPc ? '1rem 2rem' : '1.5rem 1rem',
        }}
        direction={'row'}
        spacing={'1rem'}
        alignItems={'center'}
      >
        <CuTextField
          placeholder={'댓글을 작성해주세요.'}
          fullWidth
          name={'new-content'}
          id={'new-content'}
        />
        <IconButton sx={style.IconButton} disabled={isLoading} type={'submit'}>
          <SendIcon sx={style.SendIcon} />
        </IconButton>
      </Stack>
    </form>
  )
}
