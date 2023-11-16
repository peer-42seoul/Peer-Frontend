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
  ButtonGroup,
  Stack,
} from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

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
}

const StyleSeachMobile = {
  width: '100%',
}

export default function SearchBody({ onClose }: SearchBodyProps) {
  const router = useRouter()
  const { isPc } = useMedia()
  const { control, handleSubmit, setValue } = useForm()
  const [type, setType] = useState<SearchType>(SearchType.STUDY)
  const clickStudy = () => setType(SearchType.STUDY)
  const clickProject = () => setType(SearchType.PROJECT)
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

  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{ justifyContent: 'space-between', margin: 'dense', padding: 0 }}
        >
          <Button style={{ border: 'none', color: 'white' }} onClick={onClose}>
            <ArrowBackIosNewIcon />
          </Button>
          <Typography>검색</Typography>
          <Button disabled />
        </Toolbar>
      </AppBar>

      <Box sx={isPc ? StyleSeachPc : StyleSeachMobile}>
        <ButtonGroup>
          <Button onClick={clickStudy} sx={{ border: 'none' }}>
            스터디
          </Button>
          <Button onClick={clickProject} sx={{ border: 'none' }}>
            프로젝트
          </Button>
        </ButtonGroup>

        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="searchWord"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  sx={{ width: '100%' }}
                  placeholder={
                    type === SearchType.PROJECT
                      ? '프로젝트를 찾는 중...'
                      : '스터디를 찾는 중...'
                  }
                  {...field}
                />
              )}
            />
            <Button type="submit">검색</Button>
          </form>
        </Stack>
        <SearchHistory searchwordSet={setValue} />
      </Box>
    </>
  )
}
