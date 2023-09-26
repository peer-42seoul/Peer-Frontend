import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { Autocomplete, Box, Button, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, Grid, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";

const Option = () => {
  const { handleSubmit, control } = useForm();
  const [chipData, setChipData] = useState<string[]>([]);
  const stackList = ['javaScript', 'react', 'TypeScript', 'NextJs']
  const handleDelete = (index: number) => {
    setChipData((chips) => chips.filter((chip, cIndex) => cIndex !== index));
  }

  const onSubmit = (data: any) => {
    console.log("data", data);
  }
  const handleInput = (
    event: React.SyntheticEvent,
    value: readonly string[],
  ) => {
    setChipData([...value]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12}>
        <Box>
          작업 스택
        </Box>
        <Autocomplete
          disableClearable
          multiple
          id="language-select"
          options={stackList}
          onChange={handleInput}
          value={chipData}
          renderTags={() => <></>}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="프레임워크 또는 개발언어를 입력해주세요."
            />
          )}
        />
        <Stack direction="row" gap={0.5}>
          {
            chipData.map((data, index) => {
              return (<Box key={index}><Chip label={data} variant="outlined" onDelete={() => { handleDelete(index) }} /></Box>)
            })
          }
        </Stack>
        <Box>
          목표 기간
        </Box>
        <Controller
          name="workPeriod"
          control={control}
          render={({ field }) => (
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select {...field} defaultValue={0}>
                <MenuItem value={0}>1개월 이하</MenuItem>
                <MenuItem value={1}>1개월</MenuItem>
                <MenuItem value={2}>2개월</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Box>
          작업 지역
        </Box>
        <Controller
          name="workLocation"
          control={control}
          render={({ field }) => (
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select {...field} defaultValue="none">
                <MenuItem value="gangnam">강남구</MenuItem>
                <MenuItem value="seocho">서초구</MenuItem>
                <MenuItem value="none">선택 안함</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Box>
          작업 유형
        </Box>
        <FormGroup row>
          <Controller
            name="workTypeOnline"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                aria-label="check-work-type"
                control={<Checkbox {...field} />}
                label="온라인"
              />
            )}
          />
          <Controller
            name="workTypeOffline"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                aria-label="check-work-type"
                control={<Checkbox {...field} />}
                label="오프라인"
              />
            )}
          />
          <Controller
            name="workTypeMixed"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                aria-label="check-work-type"
                control={<Checkbox {...field} />}
                label="혼합"
              />
            )}
          />
        </FormGroup>
        <Box>
          작업 단계
        </Box>
        <FormGroup row>
          <Controller
            name="workStageStart" // Field name for 작업 단계 시작전
            control={control}
            render={({ field }) => (
              <FormControlLabel
                aria-label="check-work-stage"
                control={<Checkbox {...field} />}
                label="시작전"
              />
            )}
          />
          <Controller
            name="workStageInProgress" // Field name for 작업 단계 진행중
            control={control}
            render={({ field }) => (
              <FormControlLabel
                aria-label="check-work-stage"
                control={<Checkbox {...field} />}
                label="진행중"
              />
            )}
          />
          <Controller
            name="workStageComplete" // Field name for 작업 단계 진행완료
            control={control}
            render={({ field }) => (
              <FormControlLabel
                aria-label="check-work-stage"
                control={<Checkbox {...field} />}
                label="진행완료"
              />
            )}
          />
        </FormGroup>
        <Stack direction="row" justifyContent={"space-between"}>
          <Button>초기화</Button>
          <Button type={"submit"}>확인</Button>
        </Stack>
      </Grid>
    </form>
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
