import { ReactNode, useEffect, useState } from 'react'
import {
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from '@mui/material'
import { LocalizationProvider, DateTimeField } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import useAxiosWithAuth from '@/api/config'
import { IEvent, IMember } from '@/types/WidgetDataTypes'

interface IEditModalProps {
  teamId: number
  eventId?: number
  widgetId?: string // TODO: 519 PR 이후 추가 예정
  mode: 'create' | 'edit'
}

interface IFormWrapperProps {
  title: string
  children: ReactNode
}

// mock data
const teamMembers = [
  {
    userId: 1,
    nickname: '김철수',
  },
  {
    userId: 2,
    nickname: '김영희',
  },
]

const EditModalContent = ({
  teamId,
  eventId = -1,
  widgetId,
  mode,
}: IEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [memberMap, setMemberMap] = useState<Map<number, string>>(new Map())
  const [selectedMemberId, setSelectedMemberId] = useState<number[]>([])
  const axiosInstance = useAxiosWithAuth()

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
        // mock data 사용하는 부분
        // setMemberMap(
        //   teamMembers.reduce((acc: Map<number, string>, cur: IMember) => {
        //     acc.set(cur.userId, cur.nickname)
        //     return acc
        //   }, new Map<number, string>()),
        // )
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMemberList()
  }, [])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const scheduleData: IEvent = {
      teamId,
      eventId,
      title: formData.get('title') as string,
      start: new Date(formData.get('start') as string),
      end: new Date(formData.get('end') as string),
      memo: formData.get('memo') as string,
      members: selectedMemberId.map((id) => ({
        userId: id,
        nickname: memberMap.get(id) as string,
      })),
    }
    alert(scheduleData)
  }

  const handleChange = (event: SelectChangeEvent<typeof selectedMemberId>) => {
    const { value } = event.target
    setSelectedMemberId(
      typeof value === 'string'
        ? value.split(',').map((value) => parseInt(value))
        : value,
    )
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
          </FormWrapper>
          <FormWrapper title={'종료'}>
            <CustomDateTimePicker name={'end'} />
          </FormWrapper>
          <FormWrapper title={'멤버'}>
            <Select
              multiple
              value={selectedMemberId}
              onChange={handleChange}
              // TODO :renderValue 추가
            >
              {teamMembers.map((member) => (
                <MenuItem key={member.userId} value={member.userId}>
                  <Checkbox
                    checked={selectedMemberId.includes(member.userId)}
                  />
                  <ListItemText primary={member.nickname} />
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
