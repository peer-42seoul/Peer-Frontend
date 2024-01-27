import { ReactNode } from 'react'
import { Stack, Typography } from '@mui/material'

interface IEditModalProps {
  teamId: number
  eventId?: number
  widgetId?: string // TODO: 추후 추가 예정
  mode: 'create' | 'edit'
}

const EditModalContent = ({
  teamId,
  eventId = -1,
  widgetId,
  mode,
}: IEditModalProps) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert(`${teamId} ${eventId} ${widgetId} ${mode}`)
  }
  return (
    <form id={'calender-form'} onSubmit={onSubmit}>
      <Stack spacing={'1rem'}>
        <FormWrapper title={'제목'}>
          <input type="text" />
        </FormWrapper>
        <FormWrapper title={'시작'}>
          <input type="date" />
        </FormWrapper>
        <FormWrapper title={'종료'}>
          <input type="time" />
        </FormWrapper>
        <FormWrapper title={'멤버'}>
          <input type="text" />
        </FormWrapper>
        <FormWrapper title={'메모'}>
          <textarea />
        </FormWrapper>
      </Stack>
    </form>
  )
}

interface IFormWrapperProps {
  title: string
  children: ReactNode
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

export default EditModalContent
