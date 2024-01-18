import { Stack, TextField, Typography } from '@mui/material'
import useMedia from '@/hook/useMedia'
import BackgroundBox from '../BackgroundBox'
import CuButton from '../CuButton'
import CuModal from '../CuModal'
import DynamicToastEditor from '../DynamicToastEditor'
import * as style from './EditPanel.style'

interface IChildrenProps {
  children: React.ReactNode
}

interface IEditFormProps {
  formId: string
  isLoading: boolean
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  initialTitle: string
  initialContent: string
}

interface IEditButtonProps {
  type: 'new' | 'edit'
  formId: string
  handleGoBack: () => void
}

interface IEditPageProps extends IChildrenProps {
  title: string
  type: 'new' | 'edit'
  handleGoBack: () => void
}

export const EditPage = ({
  title,
  children,
  type,
  handleGoBack,
}: IEditPageProps) => {
  const { isPc } = useMedia()
  if (isPc)
    return (
      <Stack spacing={'1.5rem'}>
        <Typography variant="Body2Emphasis" color="text.strong">
          {title}
        </Typography>
        {children}
      </Stack>
    )
  return (
    <CuModal
      open={true}
      title={title}
      onClose={handleGoBack}
      mobileFullSize
      textButton={{ text: '취소', onClick: handleGoBack }}
      containedButton={{
        text: type === 'new' ? '등록' : '완료',
        type: 'submit',
        form: 'notice-form',
      }}
    >
      <Stack sx={{ height: '100%', overflowY: 'scroll' }} spacing={'1.5rem'}>
        {children}
      </Stack>
    </CuModal>
  )
}

export const EditBox = ({ children }: IChildrenProps) => {
  const { isPc } = useMedia()
  if (isPc)
    return (
      <BackgroundBox pcSx={style.pcEditBox}>
        <Stack spacing={'2.5rem'}>{children}</Stack>
      </BackgroundBox>
    )
  return <Stack spacing={'2.5rem'}>{children}</Stack>
}

export const EditForm = ({
  formId,
  isLoading,
  onSubmit,
  initialTitle,
  initialContent,
}: IEditFormProps) => {
  return (
    <Stack sx={style.EditForm} spacing={'1.5rem'}>
      <Stack spacing={'0.5rem'}>
        <Typography variant={'CaptionEmphasis'}>제목</Typography>
        <form onSubmit={onSubmit} id={formId}>
          <TextField
            name={'title'}
            id={'title'}
            placeholder={'제목을 입력해주세요.'}
            disabled={isLoading}
            defaultValue={initialTitle}
            sx={{ maxWidth: '26rem' }}
          />
        </form>
      </Stack>
      <Stack spacing={'0.5rem'} height={'100%'}>
        <Typography variant={'CaptionEmphasis'}>내용</Typography>
        <DynamicToastEditor initialValue={initialContent} />
      </Stack>
    </Stack>
  )
}

export const EditButton = ({
  type,
  formId,
  handleGoBack,
}: IEditButtonProps) => {
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
          form={formId}
          variant={'contained'}
          message={type === 'new' ? '등록' : '완료'}
          style={style.EditButton}
          fullWidth
        />
      </Stack>
    </Stack>
  )
}
