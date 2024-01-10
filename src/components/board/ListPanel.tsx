'use client'
import dayjs from 'dayjs'
import {
  IconButton,
  InputAdornment,
  Popover,
  Stack,
  Typography,
} from '@mui/material'
import { PlusIcon, SearchIcon } from '@/icons'
import * as style from './ListPanel.style'
import CuButton from '../CuButton'
import { useRef, useState, MouseEvent } from 'react'
import CuTextField from '../CuTextField'

interface IChildrenProps {
  children: React.ReactNode
}

interface IIsPcProps {
  isPc: boolean
}

interface IListItemProps {
  isPc: boolean
  title: string
  authorNickname: string
  createdAt: Date
  onClick: () => void
}

export const ListPageContainer = ({
  children,
  isPc,
}: IChildrenProps & IIsPcProps) => {
  return (
    <Stack
      sx={{ ...style.ListPageContainer, padding: isPc ? '2rem' : '0' }}
      spacing={'2rem'}
    >
      {children}
    </Stack>
  )
}

export const NewPostButton = ({
  onClick,
  isPc,
}: IIsPcProps & {
  onClick: () => void
}) => {
  if (!isPc) return null
  return (
    <Stack direction={'row'} justifyContent={'flex-end'}>
      <CuButton
        message={'새 글쓰기'}
        startIcon={<PlusIcon sx={{ color: 'text.normal' }} />}
        action={onClick}
        style={{
          backgroundColor: 'purple.strong',
          padding: '0.75rem 1rem 0.75rem 0.625rem',
        }}
      />
    </Stack>
  )
}

const SearchPopover = ({
  setKeyword,
}: {
  setKeyword: (keyword: string) => void
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const textFieldRef = useRef<HTMLInputElement | null>(null)
  const handleOpenPopover = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }
  const handleClosePopover = () => {
    setAnchorEl(null)
  }
  const handleSearch = () => {
    if (textFieldRef.current) {
      setKeyword(textFieldRef.current.value)
    }
  }
  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        aria-describedby={'search-popover'}
      >
        <SearchIcon sx={{ color: 'text.normal' }} />
      </IconButton>
      <Popover
        id={'search-popover'}
        open={Boolean(anchorEl)}
        onClose={handleClosePopover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Stack>
          <CuTextField
            // FIXME : inputRef를 통해서 ref를 전달했을 때 ref.current가 항상 null이 나오는 문제가 있는데 원인을 못찾아서 일단 추가로 ref를 전달해주었음.
            ref={textFieldRef}
            id="search-keyword"
            placeholder="검색어를 입력하세요."
            inputRef={textFieldRef}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CuButton
                    action={handleSearch}
                    variant="text"
                    message="검색"
                  />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Popover>
    </>
  )
}

export const IconButtonContainer = ({
  isPc,
  setKeyword,
  onClickPlus,
}: IIsPcProps & {
  setKeyword: (keyword: string) => void
  onClickPlus: () => void
}) => {
  if (isPc) return <SearchPopover setKeyword={setKeyword} />
  return (
    <Stack direction={'row'}>
      <SearchPopover setKeyword={setKeyword} />
      <IconButton onClick={onClickPlus}>
        <PlusIcon sx={{ color: 'text.normal' }} />
      </IconButton>
    </Stack>
  )
}

export const ListBoxContainer = ({
  children,
  isPc,
}: IChildrenProps & { isPc?: boolean }) => {
  return (
    <Stack
      sx={{
        ...style.ListBoxContainer,
        padding: isPc ? '1.5rem' : '0.5rem 1rem 1rem 1rem',
      }}
      spacing={'1.5rem'}
    >
      {children}
    </Stack>
  )
}

export const ListStack = ({
  children,
  isPc,
}: IChildrenProps & { isPc?: boolean }) => {
  return (
    <Stack sx={isPc ? style.PcListStack : undefined} spacing={'1rem'}>
      {children}
    </Stack>
  )
}

export const StatusMessage = ({ message }: { message: string }) => {
  return (
    <ListStack>
      <Typography
        textAlign={'center'}
        variant={'Body2'}
        color={'text.alternative'}
      >
        {message}
      </Typography>
    </ListStack>
  )
}

export const ListItem = ({
  isPc,
  title,
  authorNickname,
  createdAt,
  onClick,
}: IListItemProps) => {
  return (
    <Stack
      sx={{ ...style.ListItem, padding: isPc ? '0.625rem 1rem' : '0' }}
      onClick={onClick}
      spacing={'0.25rem'}
    >
      <Typography variant={'Body1'} color={'text.strong'}>
        {title}
      </Typography>
      <Stack direction={'row'} alignItems={'center'} spacing={'0.5rem'}>
        <Typography variant={'Body2'} color={'text.alternative'}>
          {authorNickname}
        </Typography>
        <Typography variant={'Caption'} color={'text.alternative'}>
          {dayjs(createdAt).format('MM월 DD일')}
        </Typography>
      </Stack>
    </Stack>
  )
}
