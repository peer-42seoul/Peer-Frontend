import { Icon, IconButton, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import { TrashIcon, EditIcon } from '@/icons'
import { ITeamComment } from '@/types/TeamBoardTypes'
import * as style from './CommentPanel.style'
import { FormEvent } from 'react'
import CuAvatar from '../CuAvatar'
import dayjs from 'dayjs'

interface IChildrenProps {
  children: React.ReactNode
}

interface ICommentProps {
  comment: ITeamComment
  isEditMode: boolean
  handleDelete: (answerId: number) => void
  handleEdit: (e: FormEvent<HTMLFormElement>) => void
}

export const CommentContainer = ({ children }: IChildrenProps) => {
  return (
    <Stack sx={style.CommentContainer} spacing={'1rem'}>
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
        <Typography variant={'Body2'}>{comment.content}</Typography>
        <Typography variant={'Tag'} color={'text.assistive'}>
          {dayjs(comment.createdAt).format('YYYY년 M월 D일 h:m A')}
        </Typography>
      </Stack>
      {/* icon button */}
      <Stack direction={'row'} spacing={'1rem'} alignItems={'flex-start'}>
        <IconButton sx={style.IconButton} onClick={() => handleEdit}>
          <EditIcon sx={style.Icon} />
        </IconButton>
        <IconButton
          sx={style.IconButton}
          onClick={() => handleDelete(comment.answerId)}
        >
          <TrashIcon sx={style.Icon} />
        </IconButton>
      </Stack>
    </Stack>
  )
}
