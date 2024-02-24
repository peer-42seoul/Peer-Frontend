import { FormEvent, useState, MouseEvent, MutableRefObject } from 'react'
import dayjs from 'dayjs'
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { TrashIcon, EditIcon, SendIcon, MoreHorizontalIcon } from '@/icons'
import useMedia from '@/hook/useMedia'
import { ITeamComment } from '@/types/TeamBoardTypes'
import CuAvatar from '../CuAvatar'
import CuButton from '../CuButton'
import * as style from './CommentPanel.style'

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

interface IIconMenuItemProps {
  icon: React.ReactNode
  text: string
  onClick: () => void
}

interface ICommentMoreDropdownMenuProps {
  handleDelete: () => void
  setEditMode: () => void
}

interface ICommentFormContainerProps {
  textRef: MutableRefObject<HTMLInputElement | undefined>
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoading: boolean
}

export const CommentContainer = ({ children }: IChildrenProps) => {
  const { isPc } = useMedia()
  return (
    <Stack
      sx={{
        ...style.CommentContainer,
        padding: isPc ? '1.5rem 2rem' : '1.5rem 1rem',
      }}
      spacing={'1rem'}
    >
      <Typography
        color={'text.strong'}
        variant={isPc ? 'Title1' : 'CaptionEmphasis'}
      >
        댓글
      </Typography>
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

const IconMenuItem = ({ icon, text, onClick }: IIconMenuItemProps) => {
  return (
    <MenuItem onClick={onClick} sx={style.IconMenuItem}>
      <Stack direction={'row'} spacing={'0.38rem'} alignItems={'center'}>
        {icon}
        <Typography variant="Caption" color="text.alternative">
          {text}
        </Typography>
      </Stack>
    </MenuItem>
  )
}

const MENU_POSITION = {
  top: -0.5 * 16, // 0.5rem (padding)
  left: (1.5 + 1) * 16, // 1.5rem + 1rem (icon size + padding)
}

export const CommentMoreDropdownMenu = ({
  handleDelete,
  setEditMode,
}: ICommentMoreDropdownMenuProps) => {
  // TODO : DropdownMenu 컴포넌트를 활용할 수 있을지 확인해보기
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <IconButton sx={style.IconButton} onClick={handleOpen}>
        <MoreHorizontalIcon sx={style.Icon} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: MENU_POSITION.top,
          horizontal: MENU_POSITION.left,
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={style.Menu}
      >
        <MenuItem onClick={handleClose} sx={style.CloseMenuItem}>
          <MoreHorizontalIcon sx={style.MenuIcon} />
        </MenuItem>
        <IconMenuItem
          icon={<EditIcon sx={style.MenuIcon} />}
          text={'수정'}
          onClick={() => {
            setEditMode()
            handleClose()
          }}
        />
        <IconMenuItem
          icon={<TrashIcon sx={style.MenuIcon} />}
          text={'삭제'}
          onClick={() => {
            handleDelete()
            handleClose()
          }}
        />
      </Menu>
    </>
  )
}

export const CommentItem = ({
  comment,
  isEditMode,
  handleDelete,
  setEditMode,
  handleEdit,
}: ICommentProps) => {
  // TODO : 편집 권한 조건 추가할 것 (issue #485)
  const canEdit = comment.isAuthor
  return (
    <Stack direction={'row'} spacing={'1rem'} alignItems={'flex-start'}>
      {/* content */}
      <Stack sx={style.CommentContentWrapper}>
        <Stack
          sx={{ marginBottom: '0.25rem' }}
          spacing={'1rem'}
          direction={'row'}
          alignItems={'center'}
        >
          <Stack
            direction={'row'}
            alignItems={'center'}
            spacing={'0.25rem'}
            sx={{ flex: '1 0 0' }}
          >
            <CuAvatar sx={style.Avatar} src={comment.authorImage} />
            <Typography color={'text.alternative'} variant={'Caption'}>
              {comment.authorNickname}
            </Typography>
          </Stack>
          {!isEditMode && canEdit ? (
            <CommentMoreDropdownMenu
              handleDelete={() => handleDelete(comment.commentId)}
              setEditMode={() => setEditMode(true)}
            />
          ) : (
            <Box sx={style.Icon} />
          )}
        </Stack>
        {isEditMode ? (
          <form onSubmit={handleEdit}>
            <Stack spacing={1} alignItems={'flex-end'}>
              <TextField
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
          <Box sx={{ paddingRight: '2.5rem' }}>
            <Typography variant={'Body2'}>{comment.content}</Typography>
            <Typography variant={'Tag'} color={'text.assistive'}>
              {dayjs(comment.createAt).format('YYYY년 MM월 DD일 hh:mm A')}
            </Typography>
          </Box>
        )}
      </Stack>
    </Stack>
  )
}

export const CommentFormContainer = ({
  textRef,
  handleSubmit,
  isLoading,
}: ICommentFormContainerProps) => {
  const { isPc } = useMedia()
  return (
    <form onSubmit={handleSubmit}>
      <Stack
        sx={{
          ...style.CommentForm,
          padding: isPc ? '1rem 2rem' : '1rem',
        }}
        direction={'row'}
        spacing={'1rem'}
        alignItems={'center'}
      >
        <TextField
          inputRef={textRef}
          placeholder={'댓글을 작성해주세요.'}
          fullWidth
          name={'new-content'}
          id={'new-content'}
          inputProps={{ maxLength: 150 }}
        />
        <IconButton sx={style.IconButton} disabled={isLoading} type={'submit'}>
          <SendIcon sx={style.SendIcon} />
        </IconButton>
      </Stack>
    </form>
  )
}
