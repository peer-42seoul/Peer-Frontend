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

const TeamNotice = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const { isPc } = useMedia()
  const router = useRouter()
  const [keyword, setKeyword] = useState<string>('')
  return (
    <Stack width={'100%'}>
      {isPc ? (
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <SearchPopover setKeyword={setKeyword} />
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
            <SearchPopover setKeyword={setKeyword} />
            <IconButton onClick={() => router.push(`/teams/${id}/notice-edit`)}>
              <AddIcon />
            </IconButton>
          </Stack>
        )}
      </Stack>
      <NoticeList teamId={parseInt(id)} keyword={keyword} />
    </Stack>
  )
}

export default TeamNotice
