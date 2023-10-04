import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import FormCheckbox from './FormCheckbox'
import TagAutoComplete from '@/components/TagAutoComplete'

const Option = ({ setDetailOption }: { setDetailOption: any }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      due: -1,
      region: 'none',
      placeOnline: false,
      placeOffline: false,
      placeMixed: false,
      statusBefore: false,
      statusInProgress: false,
      statusAfter: false,
    },
  })
  const [tagData, setTagData] = useState<string[]>([])
  const stackList = ['javaScript', 'react', 'TypeScript', 'NextJs']
  const dueList = [
    { value: -1, label: '선택 안함' },
    { value: 0, label: '1개월 이하' },
    { value: 1, label: '1개월' },
    { value: 2, label: '2개월' },
  ]
  const regionList = [
    { value: 'none', label: '선택 안함' },
    { value: 'gangnam', label: '강남구' },
    { value: 'seocho', label: '서초구' },
  ]

  const onSubmit = (data: any) => {
    const {
      due,
      region,
      placeOnline,
      placeOffline,
      placeMixed,
      statusBefore,
      statusInProgress,
      statusAfter,
    } = data
    const makeCommaString = (obj: Object) => {
      const trueKeys = Object.keys(obj).filter((key) => obj[key])
      const resultString = trueKeys.join(',')
      return resultString
    }

    const status = makeCommaString({
      before: statusBefore,
      inProgress: statusInProgress,
      after: statusAfter,
    })

    const place = makeCommaString({
      online: placeOnline,
      offline: placeOffline,
      mixed: placeMixed,
    })

    const tag = tagData.length ? tagData.join(',') : ''
    setDetailOption({
      due: due == -1 || !due ? '' : due,
      region: region == 'none' || !region ? '' : region,
      place: place,
      status: status,
      tag: tag,
    })
  }

  const handleReset = () => {
    reset()
    setTagData([])
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>작업 스택</Box>
          <TagAutoComplete
            list={stackList}
            datas={tagData}
            setData={setTagData}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>목표 기간</Box>
          <Controller
            name="due"
            control={control}
            render={({ field }) => (
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select {...field}>
                  {dueList.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>작업 지역</Box>
          <Controller
            name="region"
            control={control}
            render={({ field }) => (
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select {...field}>
                  {regionList?.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>작업 유형</Box>
          <FormGroup row>
            <FormCheckbox name="placeOnline" label="온라인" control={control} />
            <FormCheckbox
              name="placeOffline"
              label="오프라인"
              control={control}
            />
            <FormCheckbox name="placeMixed" label="혼합" control={control} />
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>작업 단계</Box>
          <FormGroup row>
            <FormCheckbox
              name="statusBefore"
              label="모집전"
              control={control}
            />
            <FormCheckbox
              name="statusInProgress"
              label="모집중"
              control={control}
            />
            <FormCheckbox
              name="statusAfter"
              label="모집완료"
              control={control}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent={'space-between'}>
            <Button onClick={handleReset}>초기화</Button>
            <Button type={'submit'}>확인</Button>
          </Stack>
        </Grid>
      </Grid>
    </form >
  )
}

const SearchOption = ({
  openOption,
  setOpenOption,
  setDetailOption,
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
      <Grid item xs={12}>
        {openOption && <Option setDetailOption={setDetailOption} />}
      </Grid>
    </>
  )
}

export default SearchOption
