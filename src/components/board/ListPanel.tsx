'use client'
import { useRef, useState, MouseEvent } from 'react'
import dayjs from 'dayjs'
import {
  IconButton,
  InputAdornment,
  Popover,
  Stack,
  Typography,
} from '@mui/material'
import useMedia from '@/hook/useMedia'
import { PlusIcon, SearchIcon } from '@/icons'
import * as style from './ListPanel.style'
import CuButton from '../CuButton'
import CuTextField from '../CuTextField'

interface IChildrenProps {
  children: React.ReactNode
}

interface IIconButtonContainer {
  setKeyword: (keyword: string) => void
  onClickPlus: () => void
}

interface IListItemProps {
  title: string
  authorNickname: string
  createdAt: Date
  onClick?: () => void
  hit?: number
}

export const ListPageContainer = ({ children }: IChildrenProps) => {
  const { isPc } = useMedia()
  return (
    <Stack
      sx={{ ...style.ListPageContainer, padding: isPc ? '2rem' : '0' }}
      spacing={'2rem'}
    >
      {children}
    </Stack>
  )
}

export const TopPageButton = ({ children }: IChildrenProps) => {
  const { isPc } = useMedia()
  if (!isPc) return null
  return (
    <Stack direction={'row'} justifyContent={'flex-end'}>
      {children}
    </Stack>
  )
}

export const NewPostButton = ({ onClick }: { onClick: () => void }) => {
  const { isPc } = useMedia()
  if (!isPc) return null
  return (
    <CuButton
      message={'새 글쓰기'}
      startIcon={<PlusIcon sx={{ color: 'text.normal' }} />}
      action={onClick}
      TypographyProps={{ variant: 'Body1Emphasis', color: 'text.normal' }}
      style={{
        backgroundColor: 'purple.strong',
        padding: '0.75rem 1rem 0.75rem 0.625rem',
      }}
    />
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
  setKeyword,
  onClickPlus,
}: IIconButtonContainer) => {
  const { isPc } = useMedia()
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

export const ListBoxContainer = ({ children }: IChildrenProps) => {
  const { isPc } = useMedia()
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

export const ListStack = ({ children }: IChildrenProps) => {
  return (
    <Stack sx={style.ListStack} spacing={'1rem'}>
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
  title,
  authorNickname,
  createdAt,
  onClick,
  hit,
}: IListItemProps) => {
  const { isPc } = useMedia()
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
        {hit !== undefined && (
          <Typography variant={'Caption'} color={'text.alternative'}>
            조회수 {hit}
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}
