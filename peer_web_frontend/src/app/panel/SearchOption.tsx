import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { Autocomplete, Box, Button, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, Grid, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";

const Option = ({ setDetailOption }: { setDetailOption: any }) => {
  const { handleSubmit, control } = useForm();
  const [tagData, setTagData] = useState<string[]>([]);
  const stackList = ['javaScript', 'react', 'TypeScript', 'NextJs']
  const handleDelete = (index: number) => {
    setTagData((chips) => chips.filter((chip, cIndex) => cIndex !== index));
  }

  //설정하려다 너무 오래걸려서 일단 보류
  const onSubmit = (data: any) => {
    const makeCommaString = (obj: Object) => {
      const trueKeys = Object.keys(obj).filter(key => obj[key]);
      const resultString = trueKeys.join(',');
      return resultString;
    }

    const status = makeCommaString({
      before: data.statusBefore,
      inProgress: data.statusInProgress,
      after: data.statusAfter
    });

    const place = makeCommaString({
      online: data.placeOnline,
      offline: data.placeOffline,
      mixed: data.placeMixed
    });

    const tag = tagData.length ? tagData.join(',') : '';
    setDetailOption(
      { due: data.due ?? '', region: data.region ?? '', place: place, status: status, tag: tag }
    )
  }

  const handleInput = (
    event: React.SyntheticEvent,
    value: readonly string[],
  ) => {
    setTagData([...value]);
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
          options={stackList}
          onChange={handleInput}
          value={tagData}
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
            tagData.map((data, index) => {
              return (<Box key={index}><Chip label={data} variant="outlined" onDelete={() => { handleDelete(index) }} /></Box>)
            })
          }
        </Stack>
        <Box>
          목표 기간
        </Box>
        <Controller
          name="due"
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
          name="region"
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
            name="placeOnline"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                aria-label="check-work-place"
                control={<Checkbox {...field} />}
                label="온라인"
              />
            )}
          />
          <Controller
            name="placeOffline"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                aria-label="check-work-place"
                control={<Checkbox {...field} />}
                label="오프라인"
              />
            )}
          />
          <Controller
            name="placeMixed"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                aria-label="check-work-place"
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
            name="statusBefore" // Field name for 작업 단계 시작전
            control={control}
            render={({ field }) => (
              <FormControlLabel
                aria-label="check-work-status"
                control={<Checkbox {...field} />}
                label="모집전"
              />
            )}
          />
          <Controller
            name="statusInProgress" // Field name for 작업 단계 진행중
            control={control}
            render={({ field }) => (
              <FormControlLabel
                aria-label="check-work-status"
                control={<Checkbox {...field} />}
                label="모집중"
              />
            )}
          />
          <Controller
            name="statusAfter" // Field name for 작업 단계 진행완료
            control={control}
            render={({ field }) => (
              <FormControlLabel
                aria-label="check-work-status"
                control={<Checkbox {...field} />}
                label="모집완료"
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
  setDetailOption
}: {
  openOption: boolean
  setOpenOption: any
  setDetailOption: any
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
      {openOption && <Option setDetailOption={setDetailOption} />}
    </>
  )
}

export default SearchOption
