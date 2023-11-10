import {
  Box,
  Button,
  FormGroup,
  Grid,
  SelectChangeEvent,
  Stack,
} from '@mui/material'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormCheckbox from './FormCheckbox'
import TagAutoComplete from '@/components/TagAutoComplete'
import SetupSelect from '../teams/@setting/[id]/panel/SetupSelect'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'

const Options = ({ setDetailOption }: { setDetailOption: any }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      placeOnline: false,
      placeOffline: false,
      placemix: false,
      statusBefore: false,
      statusonGoing: false,
      statusdone: false,
    },
  })
  const { data: listData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/allTags`,
    defaultGetFetcher,
  )
  const [due, setDue] = useState('')
  const [tagData, setTagData] = useState<string[]>([])
  const [location, setLocation] = useState<string>('')
  const [parentLocation, setParentLocation] = useState<string>('선택안함')

  const onSubmit = (data: any) => {
    const { placeOnline, placeOffline, placemix, statusonGoing, statusdone } =
      data

    const makeCommaString = (obj: { [key: string]: boolean }) => {
      const trueKeys = Object.keys(obj).filter((key) => obj[key])
      return trueKeys.join(',')
    }

    const status = makeCommaString({
      "ONGOING": statusonGoing,
      "DONE": statusdone,
    })

    const place = makeCommaString({
      "ONLINE": placeOnline,
      "OFFLINE": placeOffline,
      "MIX": placemix,
    })

    const tag = tagData.length ? tagData.join(',') : ''
    setDetailOption({
      due: due === '선택안함' ? '' : due,
      region1: parentLocation === '선택안함' ? '' : parentLocation,
      region2: parentLocation === '선택안함' ? '' : location,
      place,
      status,
      tag,
    })
  }

  const handleReset = () => {
    reset()
    setDue('')
    setTagData([])
    setLocation('')
    setParentLocation('')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>작업 스택</Box>
          <TagAutoComplete
            list={listData?.map(({ name }: { name: string }) => name) || []}
            datas={tagData}
            setData={setTagData}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>목표 기간</Box>
          <SetupSelect
            value={due}
            setValue={(event: SelectChangeEvent) => setDue(event.target.value)}
            type="dueToSearch"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>작업 지역</Box>
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
          <Box>작업 유형</Box>
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
          <Box>작업 단계</Box>
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
