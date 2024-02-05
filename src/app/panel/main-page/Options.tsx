import {
  Box,
  Button,
  FormGroup,
  Grid,
  Slider,
  Stack,
  Typography,
} from '@mui/material'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormCheckbox from './FormCheckbox'
import TagAutoComplete from '@/components/TagAutoComplete'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'
import { ITag } from '@/types/IPostDetail'
import SettingSelect from '@/app/teams/[id]/setting/panel/SettingSelect'
import useMedia from '@/hook/useMedia'

const Options = ({
  setDetailOption,
  setOpenOption,
}: {
  setDetailOption: any
  setOpenOption?: (value: boolean) => void
}) => {
  const { isPc } = useMedia()
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tag`,
    defaultGetFetcher,
  )
  const [due, setDue] = useState<number[]>([0, 100])
  const [tagData, setTagData] = useState<ITag[]>([])
  const [location, setLocation] = useState<string>('')
  const [parentLocation, setParentLocation] = useState<string>('선택안함')
  const dueList = [
    { value: 0, label: '1주일' },
    { value: 20, label: '1개월' },
    { value: 40, label: '3개월' },
    { value: 60, label: '6개월' },
    { value: 80, label: '9개월' },
    { value: 100, label: '1년이상' },
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

    const tag = tagData.length ? tagData.map((tag) => tag.name).join(',') : ''
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
    if (!isPc && setOpenOption) {
      setOpenOption(false)
    }
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
      <Grid
        container
        spacing={2}
        padding={'1rem'}
        paddingBottom={isPc ? '1rem' : '8rem'}
      >
        <Grid item xs={12}>
          <TagAutoComplete
            title={'기술스택'}
            tagList={listData || []}
            datas={tagData}
            setData={setTagData}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant={'Caption'}>목표기간</Typography>
          <Box paddingX={'1.25rem'}>
            <Slider
              size="small"
              value={due}
              valueLabelFormat={valueLabelFormat}
              onChange={handleDueChange}
              step={null}
              valueLabelDisplay="off"
              marks={dueList.map((mark) => ({
                value: mark.value,
                label: (
                  <Typography fontSize={'0.6875rem'}>{mark.label}</Typography>
                ),
              }))}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant={'Caption'}>작업단계</Typography>
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
        <Grid item xs={12} sm={6}>
          <Typography
            variant={'Caption'}
            sx={{
              display: 'block',
            }}
          >
            활동지역
          </Typography>
          <Stack gap={'0.5rem'} flexWrap={'wrap'} direction={'row'}>
            <SettingSelect
              value={parentLocation}
              setValue={(value) => setParentLocation(value)}
              type="location"
            />
            <SettingSelect
              value={location}
              setValue={(value) => setLocation(value)}
              type="location"
              parentLocation={parentLocation}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant={'Caption'}>활동방식</Typography>
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
        <Grid item xs={12}>
          <Stack direction="row" justifyContent={'space-between'}>
            <Button onClick={handleReset} sx={{ padding: 0 }}>
              <Typography variant={'Caption'}>초기화</Typography>
            </Button>
            <Button type={'submit'} variant={'text'} sx={{ padding: 0 }}>
              <Typography variant={'Caption'}>확인</Typography>
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  )
}

export default Options
