import useMedia from '@/hook/useMedia'
import SearchHistory from './SearchHistory'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
  TextField,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import { MouseEvent, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import SearchIcon from '@mui/icons-material/Search'

const SearchButton = () => {
  return (
    <Button type="submit">
      <SearchIcon />
    </Button>
  )
}

const ToggleButtonStyle = {
  color: 'gray',
  border: 'none',
  fontSize: '1.5rem',
  margin: 0,
  marginRight: '0.5rem',
  padding: 0,
  '&.Mui-selected': {
    backgroundColor: 'transparent',
    color: 'text.normal',
  },
  '&:hover': {
    border: 'none',
    color: 'text.normal',
  },
}

// const SearchTextfieldStyle = {
//   flexGrow: 1,
//   '& .MuiInputBase-root': {
//     borderRadius: '2rem',
//   },
// }

interface SearchBodyProps {
  onClose: () => void
}

enum SearchType {
  STUDY = 'STUDY',
  PROJECT = 'PROJECT',
}

const StyleSeachPc = {
  width: '60%',
  ml: 'auto',
  mr: 'auto',
  mt: '2%',
}

const StyleSeachMobile = {
  width: '100%',
}

export default function SearchBody({ onClose }: SearchBodyProps) {
  const router = useRouter()
  const { isPc } = useMedia()
  const { control, handleSubmit, setValue } = useForm()
  const [type, setType] = useState<SearchType>(SearchType.STUDY)

  const onSubmit = (data: any) => {
    const keyword = data.searchWord

    // 기존에 저장된 검색어 개수 확인
    const storedKeywords = Object.keys(localStorage)
      .filter((key) => key.startsWith('searchWord_'))
      .sort((a, b) => Number(a.split('_')[1]) - Number(b.split('_')[1])) // 오래된 순으로 정렬

    const maxKeywords = 5

    // 기존 검색어 개수를 초과하는 경우, 가장 오래된 검색어 삭제
    while (storedKeywords.length >= maxKeywords) {
      const oldestKeyword = storedKeywords.shift()
      if (oldestKeyword) localStorage.removeItem(oldestKeyword)
    }

    // 새로운 검색어 localStorage에 저장
    const newKeywordIndex =
      Math.max(...storedKeywords.map((key) => Number(key.split('_')[1])), 0) + 1
    const newKeywordKey = `searchWord_${newKeywordIndex}`
    localStorage.setItem(newKeywordKey, keyword)

    router.push(`?keyword=${data.searchWord}`)
    onClose()
  }

  const handleChanged = (
    event: MouseEvent<HTMLElement>,
    newAlignment: SearchType,
  ) => {
    if (newAlignment === null) return
    setType(newAlignment)
  }

  return (
    <>
      <Stack sx={{ m: 0, p: 0 }}>
        <AppBar position="static">
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              margin: 'dense',
              padding: 0,
            }}
          >
            <Button sx={{ border: 'none', color: 'normal' }} onClick={onClose}>
              <ArrowBackIosNewIcon />
            </Button>
            <Typography>검색</Typography>
            <Button disabled />
          </Toolbar>
        </AppBar>

        <Box sx={isPc ? StyleSeachPc : StyleSeachMobile}>
          <ToggleButtonGroup onChange={handleChanged} exclusive value={type}>
            <ToggleButton
              size="large"
              sx={ToggleButtonStyle}
              value={SearchType.STUDY}
            >
              스터디
            </ToggleButton>
            <ToggleButton
              size="large"
              sx={ToggleButtonStyle}
              value={SearchType.PROJECT}
            >
              프로젝트
            </ToggleButton>
          </ToggleButtonGroup>

          <Stack direction="row" spacing={1} sx={{ width: '100%', mt: 1 }}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: '100%', height: '2.5rem' }}
            >
              <Stack direction="row" spacing={1}>
                <Controller
                  name="searchWord"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      sx={{ flexGrow: 1 }}
                      InputProps={{
                        endAdornment: <SearchButton />,
                        style: { borderRadius: '2rem' },
                      }}
                      placeholder={
                        type === SearchType.PROJECT
                          ? '프로젝트를 찾는 중...'
                          : '스터디를 찾는 중...'
                      }
                      {...field}
                    />
                  )}
                />
              </Stack>
            </form>
          </Stack>
          <SearchHistory searchwordSet={setValue} />
        </Box>
      </Stack>
    </>
  )
}
