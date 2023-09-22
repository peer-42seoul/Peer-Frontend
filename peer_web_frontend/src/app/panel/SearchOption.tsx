import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { Autocomplete, Box, Button, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, Grid, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react';

const Option = () => {
  const [chipData, setChipData] = useState([]);
  const handleDelete = (index: number) => {
    setChipData((chips) => chips.filter((chip, cIndex) => cIndex !== index));
  }

  const stackList = ['javaScript', 'react', 'TypeScript', 'NextJs']
  return (
    <Grid item xs={12}>
      <Box>
        작업 스택
      </Box>
      <Box>
        <Autocomplete
          multiple
          id="language-select"
          options={stackList}
          renderInput={(params) => <TextField {...params} placeholder="프레임워크 또는 개발언어를 입력해주세요." />}
        />
      </Box>
      <Box>
        {
          chipData.map((data, index) => {
            return (<Chip label={data} key={index} variant="outlined" onDelete={() => { handleDelete(index) }} />)
          })
        }
      </Box>
      <Box>
        목표 기간
      </Box>
      <Box>
        작업 지역
      </Box>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Select defaultValue={"none"}>
          <MenuItem value={'gangnam'}>강남구</MenuItem>
          <MenuItem value={'seocho'}>서초구</MenuItem>
          <MenuItem value={'none'}>선택 안함</MenuItem>
        </Select>
      </FormControl>
      <Box>
        작업 유형
      </Box>
      <FormGroup row>
        <FormControlLabel aria-label="check-region" control={<Checkbox />} label="온라인" />
        <FormControlLabel aria-label="check-region" control={<Checkbox />} label="오프라인" />
        <FormControlLabel aria-label="check-region" control={<Checkbox />} label="혼합" />
      </FormGroup>
      <Box>
        작업 단계
      </Box>
      <FormGroup row>
        <FormControlLabel aria-label="check-region" control={<Checkbox />} label="시작전" />
        <FormControlLabel aria-label="check-region" control={<Checkbox />} label="진행중" />
        <FormControlLabel aria-label="check-region" control={<Checkbox />} label="진행완료" />
      </FormGroup>
      <Stack direction="row" justifyContent={"space-between"}>
        <Button>초기화</Button>
        <Button>확인</Button>
      </Stack>
    </Grid>
  )
}

const SearchOption = ({
  openOption,
  setOpenOption,
}: {
  openOption: boolean
  setOpenOption: any
}) => {
  return (
    <>
      <Grid item xs={8}>
        <Stack justifyContent={'center'}>
          <Typography variant="body2">
            맞춤 프로젝트를 빠르게 찾아요.
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <Stack
          direction="row"
          alignItems={'center'}
          justifyContent={'flex-end'}
          onClick={() => {
            setOpenOption(!openOption)
          }}
        >
          <Typography variant="body2">세부 옵션</Typography>
          <IconButton>
            {openOption ? <ArrowDropDown /> : <ArrowDropUp />}
          </IconButton>
        </Stack>
      </Grid>
      {openOption && <Option />}
    </>
  )
}

export default SearchOption
