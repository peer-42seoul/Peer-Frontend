import {
  Box,
  IconButton,
  Modal,
  ModalProps,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material'
import useMedia from '@/hook/useMedia'
import { ChevronLeft, CloseIcon } from '@/icons'
import CuButton from './CuButton'
import * as style from './CuModal.style'

/**
 * IModalButton
 * @param text 버튼에 표시될 텍스트입니다.
 * @param onClick 버튼을 클릭했을 때 실행될 함수입니다.
 * @param type 버튼의 타입입니다. (기본값: 'button')
 * @param form 버튼이 속한 폼의 id입니다.
 * @param isLoading 버튼이 로딩 중인지 여부입니다. (기본값: false)
 */

interface IModalButton {
  text: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  form?: string
  isLoading?: boolean
}

export interface ICuModalProps extends Omit<ModalProps, 'onClose'> {
  title: string
  containedButton?: IModalButton
  textButton?: IModalButton
  mobileFullSize?: boolean // 기본적으로 false입니다.
  onClose: () => void
}

const getModalWrapperStyle = (isPc: boolean, mobileFullSize?: boolean) => {
  return isPc
    ? style.pcWrapper
    : mobileFullSize
      ? style.mobileFullSizeWrapper
      : style.mobileWrapper
}

/**
 * confirm 모달처럼 텍스트만 보여주는 모달이라면 CuTextModal을 사용할 수 있습니다.
 *
 * 기본적으로 MUI Modal에서 쓰이는 props를 모두 사용할 수 있습니다.
 * https://mui.com/material-ui/api/modal/
 * @param open Modal의 열림 여부입니다. (필수)
 *
 * (디자인 적용을 위해 추가된 props)
 * @param title Modal의 제목입니다. (필수)
 * @param onClose Modal의 닫기 함수입니다. (필수)
 * @param containedButton (IModalButton) Modal의 주 버튼입니다. (선택)
 * @param textButton (IModalButton) Modal의 보조 버튼입니다. (선택)
 * @param mobileFullSize 모바일에서 모달이 전체 화면을 차지하도록 합니다. (기본값: false)
 */

const CuModal = ({
  title,
  containedButton,
  textButton,
  mobileFullSize,
  open,
  onClose,
  sx,
  keepMounted,
  children,
}: ICuModalProps) => {
  const { isPc } = useMedia()
  return (
    <Modal open={open} onClose={onClose} keepMounted={!!keepMounted}>
      <Stack
        spacing={'1.5rem'}
        sx={{ ...getModalWrapperStyle(isPc, mobileFullSize), ...sx }}
      >
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          spacing={'1rem'}
        >
          {!isPc && mobileFullSize ? (
            <IconButton onClick={onClose} sx={style.headerMobileButton}>
              <ChevronLeft />
            </IconButton>
          ) : (
            <Box sx={style.headerDummyButton}></Box>
          )}
          <Typography
            variant={isPc ? 'Title2Emphasis' : 'Body1Emphasis'}
            color="text.normal"
            sx={style.title}
          >
            {title}
          </Typography>
          <IconButton onClick={onClose} sx={style.headerCloseButton}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Stack sx={style.modalContent} justifyContent={'center'}>
          {children}
        </Stack>
        <Stack direction={'row'} spacing={'1rem'} width={'100%'}>
          {textButton ? (
            <CuButton
              variant={'text'}
              message={textButton.isLoading ? '' : textButton.text}
              action={textButton.onClick}
              fullWidth
              style={style.textButton}
              TypographyProps={style.textButtonTypo}
              type={textButton.type}
              form={textButton.form}
              disabled={textButton.isLoading}
              startIcon={
                textButton.isLoading ? <CircularProgress /> : undefined
              }
            />
          ) : null}
          {containedButton ? (
            <CuButton
              variant={'contained'}
              message={containedButton.isLoading ? '' : containedButton.text}
              action={containedButton.onClick}
              fullWidth
              style={style.containedButton}
              TypographyProps={style.containedButtonTypo}
              type={containedButton.type}
              form={containedButton.form}
              disabled={containedButton.isLoading}
              startIcon={
                containedButton.isLoading ? <CircularProgress /> : undefined
              }
            />
          ) : null}
        </Stack>
      </Stack>
    </Modal>
  )
}

export default CuModal
