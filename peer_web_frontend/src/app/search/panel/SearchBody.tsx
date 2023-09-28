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

interface SearchBodyProps {
  onClose: () => void
}

enum SearchType {
  STUDY,
  PROJECT,
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
  const { isPc } = useMedia()
  const [type, setType] = useState<SearchType>(SearchType.STUDY)
  const [searchText, setSearchText] = useState<string>('')

  const clickStudy = () => setType(SearchType.STUDY)
  const clickProject = () => setType(SearchType.PROJECT)

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
          <TextField
            sx={{ width: '100%' }}
            placeholder={type ? '프로젝트를 찾는 중...' : '스터디를 찾는 중...'}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button>검색</Button>
        </Stack>

        <SearchHistory />
      </Box>
    </>
  )
}
