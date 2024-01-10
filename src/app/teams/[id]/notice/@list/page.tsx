'use client'
import { useState, MouseEvent, useRef } from 'react'
import {
  Typography,
  Stack,
  IconButton,
  Popover,
  InputAdornment,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CuTextField from '@/components/CuTextField'
import CuButton from '@/components/CuButton'
import {
  ListPageContainer,
  ListBoxContainer,
} from '@/components/board/ListPanel'
import useMedia from '@/hook/useMedia'
import SearchIcon from '@/icons/SearchIcon'
import useTeamPageState from '@/states/useTeamPageState'
import NoticeList from './panel/NoticeList'

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

const TeamNotice = ({ params }: { params: { id: string } }) => {
  const { id: teamId } = params
  const { isPc } = useMedia()
  const { setNotice } = useTeamPageState()
  const [keyword, setKeyword] = useState<string>('')

  return (
    <ListPageContainer>
      {isPc ? (
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <CuButton
            message={'새 글쓰기'}
            startIcon={<AddIcon sx={{ color: 'text.normal' }} />}
            action={() => setNotice('EDIT')}
            style={{
              backgroundColor: 'purple.strong',
              padding: '0.75rem 1rem 0.75rem 0.625rem',
            }}
          />
        </Stack>
      ) : null}
      <ListBoxContainer>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Typography variant="Title3Emphasis">공지사항</Typography>
          {isPc ? (
            <SearchPopover setKeyword={setKeyword} />
          ) : (
            <Stack direction={'row'}>
              <SearchPopover setKeyword={setKeyword} />
              <IconButton onClick={() => setNotice('EDIT')}>
                <AddIcon />
              </IconButton>
            </Stack>
          )}
        </Stack>
        <NoticeList teamId={parseInt(teamId)} keyword={keyword} />
      </ListBoxContainer>
    </ListPageContainer>
  )
}

export default TeamNotice
