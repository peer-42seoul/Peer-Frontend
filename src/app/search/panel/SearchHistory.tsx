import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Stack,
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'

export default function SearchHistory({
  searchwordSet,
}: {
  searchwordSet: UseFormSetValue<FieldValues>
}) {
  const [searchKeywords, setSearchKeywords] = useState<string[]>([])

  // 컴포넌트가 마운트 될 때 localStorage에서 검색어 가져오기
  useEffect(() => {
    const storedKeywords = Object.keys(localStorage)
      .filter((key) => key.startsWith('searchWord_'))
      .sort((a, b) => Number(b.split('_')[1]) - Number(a.split('_')[1]))
      .map((key) => localStorage.getItem(key) || '') // 만약 localStorage에서 아이템을 가져오지 못하는 경우를 대비해서 ''를 추가했습니다.

    setSearchKeywords(storedKeywords)
  }, [])

  // 검색어 삭제 함수
  const deleteKeyword = (keyword: string) => {
    const storedKeywords = Object.keys(localStorage)
      .filter((key) => key.startsWith('searchWord_'))
      .sort((a, b) => Number(b.split('_')[1]) - Number(a.split('_')[1]))

    // 키워드에 해당하는 항목을 로컬 스토리지에서 삭제
    const keywordKey = storedKeywords.find(
      (key) => localStorage.getItem(key) === keyword,
    )
    if (keywordKey) {
      localStorage.removeItem(keywordKey)
    }

    // 나머지 키워드들을 가져옴
    const remainingKeywords = storedKeywords
      .filter((key) => key !== keywordKey)
      .map((key) => localStorage.getItem(key) || '')

    setSearchKeywords(remainingKeywords)
  }

  return (
    <>
      <List sx={{ my: '2rem' }}>
        <Typography padding={1} fontSize={'small'} color={'grey'}>
          최근 검색어
        </Typography>
        <Stack mx={'1rem'}>
          {searchKeywords.length &&
            searchKeywords.map((keyword, index) => (
              <ListItem
                sx={{
                  m: 0,
                  p: 0,
                }}
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteKeyword(keyword)}
                  >
                    <CloseIcon color="inherit" />
                  </IconButton>
                }
              >
                <IconButton
                  onClick={() => searchwordSet('searchWord', keyword)}
                >
                  <ListItemText primary={keyword} />
                </IconButton>
              </ListItem>
            ))}
          {searchKeywords.length === 0 && (
            <Typography padding={1} fontSize={'small'} color={'grey'}>
              최근 검색어가 없습니다.
            </Typography>
          )}
        </Stack>
      </List>
    </>
  )
}
