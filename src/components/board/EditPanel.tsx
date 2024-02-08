import { Box, Stack, TextField, Typography } from '@mui/material'
import useMedia from '@/hook/useMedia'
import BackgroundBox from '../BackgroundBox'
import CuButton from '../CuButton'
import CuModal from '../CuModal'
import DynamicToastEditor from '../DynamicToastEditor'
import * as style from './EditPanel.style'
import { Editor } from '@toast-ui/editor'

interface IChildrenProps {
  children: React.ReactNode
}

interface IEditFormProps {
  isLoading: boolean
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  titleRef: React.RefObject<HTMLInputElement>
  editorRef: React.RefObject<Editor>
  initialData: {
    title: string
    content: string
  }
  type: 'new' | 'edit'
  handleGoBack: () => void
}

interface IEditButtonProps {
  type: 'new' | 'edit'
  handleGoBack: () => void
}

interface IEditPageProps extends IChildrenProps {
  title: string
  type: 'new' | 'edit'
  handleGoBack: () => void
}

export const EditPage = ({ title, children, handleGoBack }: IEditPageProps) => {
  const { isPc } = useMedia()
  if (isPc)
    return (
      <Stack spacing={'1.5rem'} width={'100%'}>
        <Typography variant="Body2Emphasis" color="text.strong">
          {title}
        </Typography>
        {children}
      </Stack>
    )
  return (
    <CuModal open={true} title={title} onClose={handleGoBack} mobileFullSize>
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
  isLoading,
  onSubmit,
  titleRef,
  editorRef,
  initialData,
  type,
  handleGoBack,
}: IEditFormProps) => {
  const { isPc } = useMedia()

  return (
    <form onSubmit={onSubmit}>
      <Stack sx={style.EditForm} spacing={'1.5rem'}>
        <Stack spacing={'0.5rem'}>
          <Typography variant={'CaptionEmphasis'}>제목</Typography>
          <TextField
            inputRef={titleRef}
            name={'post-title'}
            placeholder={'제목을 입력해주세요.'}
            disabled={isLoading}
            defaultValue={initialData.title || ''}
            sx={{ maxWidth: '26rem' }}
          />
        </Stack>
        <Stack spacing={'0.5rem'} height={'100%'}>
          <Typography variant={'CaptionEmphasis'}>내용</Typography>
          <Box>
            <DynamicToastEditor
              initialValue={initialData.content || ''}
              editorRef={editorRef}
              height={isPc ? '30rem' : '50vh'}
            />
          </Box>
        </Stack>
      </Stack>
      <EditButton type={type} handleGoBack={handleGoBack} />
    </form>
  )
}

export const EditButton = ({ type, handleGoBack }: IEditButtonProps) => {
  const { isPc } = useMedia()

  return (
    <Stack
      direction={'row'}
      justifyContent={'flex-end'}
      sx={style.EditButtonContainer}
    >
      <Stack
        width={isPc ? '18.5rem' : '100%'}
        direction={'row'}
        spacing={'1rem'}
      >
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
          variant={'contained'}
          message={type === 'new' ? '등록' : '완료'}
          style={style.EditButton}
          fullWidth
        />
      </Stack>
    </Stack>
  )
}
