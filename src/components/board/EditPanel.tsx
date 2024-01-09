import { OutlinedInput, Stack, Typography } from '@mui/material'
import BackgroundBox from '../BackgroundBox'
import * as style from './EditPanel.style'
import DynamicToastEditor from '../DynamicToastEditor'
import CuTextField from '../CuTextField'

interface IChildrenProps {
  children: React.ReactNode
}

interface IEditFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  initialTitle: string
  initialContent: string
}

export const EditPage = ({
  title,
  children,
}: IChildrenProps & { title: string }) => {
  return (
    <Stack spacing={'1.5rem'}>
      <Typography variant="Body2Emphasis" color="text.strong">
        {title}
      </Typography>
      {children}
    </Stack>
  )
}

export const EditBox = ({ children }: IChildrenProps) => {
  return (
    <BackgroundBox pcSx={style.pcEditBox}>
      <Stack spacing={'2.5rem'}>{children}</Stack>
    </BackgroundBox>
  )
}

export const EditForm = ({
  onSubmit,
  initialTitle,
  initialContent,
}: IEditFormProps) => {
  return (
    <form onSubmit={onSubmit} id={'notice-form'}>
      <Stack spacing={'1.5rem'}>
        <Stack spacing={'0.5rem'}>
          <Typography variant={'CaptionEmphasis'}>제목</Typography>
          <CuTextField
            name={'title'}
            placeholder={'제목을 입력해주세요.'}
            defaultValue={initialTitle}
            sx={{ maxWidth: '26rem' }}
          />
        </Stack>
        <Stack spacing={'0.5rem'}>
          <Typography variant={'CaptionEmphasis'}>내용</Typography>
          <DynamicToastEditor initialValue={initialContent} />
        </Stack>
      </Stack>
    </form>
  )
}
