import {
  Box,
  Button,
  FormGroup,
  Grid,
  SelectChangeEvent,
  Slider,
  Stack,
  Typography,
} from '@mui/material'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormCheckbox from './FormCheckbox'
import TagAutoComplete from '@/components/TagAutoComplete'
import SetupSelect from '../../teams/[id]/setting/panel/SetupSelect'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'

const Options = ({ setDetailOption }: { setDetailOption: any }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      placeOnline: false,
      placeOffline: false,
      placemix: false,
      statusonGoing: false,
      statusdone: false,
    },
  })
  const { data: listData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/tag`,
    defaultGetFetcher,
  )
  const [due, setDue] = useState<number[]>([0, 100])
  const [tagData, setTagData] = useState<string[]>([])
  const [location, setLocation] = useState<string>('')
  const [parentLocation, setParentLocation] = useState<string>('선택안함')
  const dueList = [
    { value: 0, label: '1주일' },
    { value: 20, label: '1개월' },
    { value: 40, label: '3개월' },
    { value: 60, label: '6개월' },
    { value: 80, label: '9개월' },
    { value: 100, label: '12개월 이상' },
  ]

  const onSubmit = (data: any) => {
    const { placeOnline, placeOffline, placemix, statusonGoing, statusdone } =
      data

    const makeCommaString = (obj: { [key: string]: boolean }) => {
      const trueKeys = Object.keys(obj).filter((key) => obj[key])
      return trueKeys.join(',')
    }

    const status = makeCommaString({
      ONGOING: statusonGoing,
      DONE: statusdone,
    })

    const place = makeCommaString({
      ONLINE: placeOnline,
      OFFLINE: placeOffline,
      MIX: placemix,
    })

    const tag = tagData.length ? tagData.join(',') : ''
    //제출할 때는 숫자로 들어옴
    setDetailOption({
      due1: due[0],
      due2: due[1],
      region1: parentLocation === '선택안함' ? '' : parentLocation,
      region2: parentLocation === '선택안함' ? '' : location,
      place,
      status,
      tag,
    })
  }

  const handleReset = () => {
    reset()
    setDue([0, 100])
    setTagData([])
    setLocation('')
    setParentLocation('')
    setDetailOption({
      due1: 0,
      due2: 100,
      region1: '',
      region2: '',
      place: '',
      status: '',
      tag: '',
    })
  }

  function valueLabelFormat(value: number) {
    return dueList.findIndex((mark) => mark.value === value) + 1
  }

  const handleDueChange = (_: Event, newValue: number | number[]) => {
    setDue(newValue as number[])
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>작업 스택</Typography>
          <TagAutoComplete
            tagList={listData || []}
            datas={tagData}
            setData={setTagData}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>목표 기간</Typography>
          <Box paddingX={4}>
            <Slider
              value={due}
              valueLabelFormat={valueLabelFormat}
              onChange={handleDueChange}
              step={null}
              valueLabelDisplay="off"
              marks={dueList}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>작업 지역</Typography>
          <SetupSelect
            value={parentLocation}
            setValue={(event: SelectChangeEvent) =>
              setParentLocation(event.target.value)
            }
            type="location"
          />
          <SetupSelect
            value={location}
            setValue={(event: SelectChangeEvent) =>
              setLocation(event.target.value)
            }
            type="location"
            parentLocation={parentLocation}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>작업 유형</Typography>
          <FormGroup row>
            <FormCheckbox name="placeOnline" label="온라인" control={control} />
            <FormCheckbox
              name="placeOffline"
              label="오프라인"
              control={control}
            />
            <FormCheckbox name="placemix" label="혼합" control={control} />
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>작업 단계</Typography>
          <FormGroup row>
            <FormCheckbox
              name="statusonGoing"
              label="모집중"
              control={control}
            />
            <FormCheckbox
              name="statusdone"
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
    </form>
  )
}

export default Options
