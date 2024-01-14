import { Stack, Typography } from '@mui/material'
import BackgroundBox from '../BackgroundBox'
import * as style from './EditPanel.style'
import DynamicToastEditor from '../DynamicToastEditor'
import CuTextField from '../CuTextField'
import CuButton from '../CuButton'

interface IChildrenProps {
  children: React.ReactNode
}

interface IEditFormProps {
  isLoading: boolean
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  initialTitle: string
  initialContent: string
}

interface IEditButtonProps {
  type: 'new' | 'edit'
  handleGoBack: () => void
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
  isLoading,
  onSubmit,
  initialTitle,
  initialContent,
}: IEditFormProps) => {
  return (
    <form onSubmit={onSubmit} id={'notice-form'}>
      <Stack sx={style.EditForm} spacing={'1.5rem'}>
        <Stack spacing={'0.5rem'}>
          <Typography variant={'CaptionEmphasis'}>제목</Typography>
          <CuTextField
            name={'title'}
            placeholder={'제목을 입력해주세요.'}
            disabled={isLoading}
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

export const EditButton = ({ type, handleGoBack }: IEditButtonProps) => {
  return (
    <Stack direction={'row'} justifyContent={'flex-end'}>
      <Stack width={'18.5rem'} direction={'row'} spacing={'1rem'}>
        <CuButton
          variant={'text'}
          action={handleGoBack}
          message={'취소'}
          TypographyProps={{ color: 'purple.strong' }}
          style={style.EditButton}
          fullWidth
        />
        <CuButton
          type={'submit'}
          form={'notice-form'}
          variant={'contained'}
          message={type === 'new' ? '등록' : '완료'}
          style={style.EditButton}
          fullWidth
        />
      </Stack>
    </Stack>
  )
}
