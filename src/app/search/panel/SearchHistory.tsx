import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
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
      .map((key) => localStorage.getItem(key) || '') // 만약 localStorage에서 아이템을 가져오지 못하는 경우를 대비해서 ''를 추가했습니다.
    setSearchKeywords(storedKeywords)
  }, [])

  // 검색어 삭제 함수
  const deleteKeyword = (index: number) => {
    localStorage.removeItem(`searchWord_${index}`)
    setSearchKeywords((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <>
      <List>
        <Typography padding={1} fontSize={'small'} color={'grey'}>
          최근 검색어
        </Typography>

        {searchKeywords.map((keyword, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteKeyword(index)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <IconButton onClick={() => searchwordSet('searchWord', keyword)}>
              <ListItemText primary={keyword} />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </>
  )
}
