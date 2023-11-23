'use client'
import { useState, MouseEvent, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  Typography,
  Button,
  Stack,
  IconButton,
  Popover,
  InputAdornment,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import useMedia from '@/hook/useMedia'
import NoticeList from './panel/NoticeList'
import CuTextField from '@/components/CuTextField'
import CuButton from '@/components/CuButton'

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
        <SearchIcon />
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
            id="search"
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

const TeamNotice = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const { isPc } = useMedia()
  const router = useRouter()
  return (
    <Stack width={'100%'}>
      {isPc ? (
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <SearchPopover setKeyword={(keyword) => console.log(keyword)} />
          <Button
            onClick={() => router.push(`/teams/${id}/notice-edit`)}
            variant="contained"
            startIcon={<AddIcon />}
          >
            새 글쓰기
          </Button>
        </Stack>
      ) : null}
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography>공지사항</Typography>
        {isPc ? null : (
          <Stack direction={'row'}>
            <SearchPopover setKeyword={(keyword) => console.log(keyword)} />
            <IconButton onClick={() => router.push(`/teams/${id}/notice-edit`)}>
              <AddIcon />
            </IconButton>
          </Stack>
        )}
      </Stack>
      <NoticeList teamId={parseInt(id)} />
    </Stack>
  )
}

export default TeamNotice
