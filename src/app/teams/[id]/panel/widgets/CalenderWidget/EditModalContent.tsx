import { ReactNode, useEffect, useState } from 'react'
import {
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControlLabel,
  InputBase,
} from '@mui/material'
import { LocalizationProvider, DateTimeField } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import useAxiosWithAuth from '@/api/config'
import CuCheckbox from '@/components/CuCheckBox'
import CuCircularProgress from '@/components/CuCircularProgress'
import useToast from '@/states/useToast'
import { IMember } from '@/types/WidgetDataTypes'
import * as style from './EditModalContent.style'

interface IEditModalProps {
  teamId: number
  eventId?: number
  widgetId?: string // TODO: 519 PR 이후 추가 예정
  closeEditModal: () => void
  mode: 'create' | 'edit'
}

interface IFormWrapperProps {
  title: string
  children: ReactNode
}

const EditModalContent = ({
  teamId,
  eventId = -1,
  closeEditModal, // widgetId, mode, (lint error를 피하기 위해 주석처리함)
}: IEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [memberMap, setMemberMap] = useState<Map<number, string>>(new Map())
  const [selectedMemberId, setSelectedMemberId] = useState<number[]>([])
  const axiosInstance = useAxiosWithAuth()
  const { openToast } = useToast()

  useEffect(() => {
    const fetchMemberList = async () => {
      setIsLoading(true)
      try {
        const res = await axiosInstance.post(
          '/api/v1/dnd-sub/calendar/team-list',
          {
            teamId,
          },
        )
        setMemberMap(
          res.data.reduce((acc: Map<number, string>, cur: IMember) => {
            acc.set(cur.userId, cur.nickname)
            return acc
          }, new Map<number, string>()),
        )
      } catch (e) {
        alert('멤버 목록을 불러오는데 실패했습니다.')
        closeEditModal()
      } finally {
        setIsLoading(false)
      }
    }
    fetchMemberList()
  }, [])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const alarmData = {
      teamId,
      eventId,
      title: formData.get('title') as string,
      start: new Date(formData.get('start') as string),
      end: new Date(formData.get('end') as string),
      member: selectedMemberId.map((id) => ({
        userId: id,
        nickname: memberMap.get(id) as string,
      })),
    }
    // TODO: 519 PR 이후 위젯 데이터 업데이트 로직 추가
    const scheduleData = { ...alarmData, memo: formData.get('memo') as string }
    if (formData.get('set-alarm') === 'on') {
      axiosInstance
        .post(`/api/v1/dnd-sub/calendar/set-alarm`, alarmData)
        .then((res) => {
          scheduleData.eventId = res.data // eventId를 받아옴
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          // TODO : 위젯 업데이트
          openToast({
            severity: 'success',
            message: '일정과 알림이 추가되었습니다.',
          })
          closeEditModal()
        })
    } else {
      // TODO : 위젯 업데이트
      openToast({
        severity: 'success',
        message: '일정이 추가되었습니다.',
      })
      closeEditModal()
    }
  }

  const handleChange = (event: SelectChangeEvent<typeof selectedMemberId>) => {
    const { value } = event.target
    setSelectedMemberId(
      typeof value === 'string'
        ? value.split(',').map((value) => parseInt(value))
        : value,
    )
  }

  if (isLoading) {
    return <CuCircularProgress color={'primary'} />
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form id={'calender-form'} onSubmit={onSubmit}>
        <Stack spacing={'1rem'}>
          <FormWrapper title={'제목'}>
            <TextField name={'title'} placeholder={'일정 제목을 입력하세요.'} />
          </FormWrapper>
          <FormWrapper title={'시작'}>
            <CustomDateTimePicker name={'start'} />
            <FormControlLabel
              componentsProps={{
                typography: {
                  variant: 'Caption',
                  color: 'text.strong',
                },
              }}
              control={<CuCheckbox />}
              label="알림 설정하기"
              name={'set-alarm'}
            />
          </FormWrapper>
          <FormWrapper title={'종료'}>
            <CustomDateTimePicker name={'end'} />
          </FormWrapper>
          <FormWrapper title={'멤버'}>
            <Select
              multiple
              value={selectedMemberId}
              onChange={handleChange}
              renderValue={(selected) =>
                selected.map((value) => memberMap.get(value)).join(', ')
              }
              input={<InputBase sx={style.selectInput} />}
            >
              {/* map을 순회할 수 있는 더 좋은 방법을 찾아보기 */}
              {Array.from(memberMap.keys()).map((memberId) => (
                <MenuItem dense key={memberId} value={memberId}>
                  <CuCheckbox checked={selectedMemberId.includes(memberId)} />
                  <Typography variant={'Body2'}>
                    {memberMap.get(memberId)}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormWrapper>
          <FormWrapper title={'메모'}>
            <TextField
              name={'memo'}
              minRows={10}
              maxRows={10}
              multiline
              placeholder={'일정 메모를 입력하세요.'}
            />
          </FormWrapper>
        </Stack>
      </form>
    </LocalizationProvider>
  )
}

const FormWrapper = ({ title, children }: IFormWrapperProps) => {
  return (
    <Stack spacing={'0.25rem'}>
      <Typography variant={'CaptionEmphasis'} color={'text.strong'}>
        {title}
      </Typography>
      {children}
    </Stack>
  )
}

const CustomDateTimePicker = ({ name }: { name: string }) => {
  return <DateTimeField name={name} format={'YYYY-MM-DD hh:mm'} />
}

export default EditModalContent
