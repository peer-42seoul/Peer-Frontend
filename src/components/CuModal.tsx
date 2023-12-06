import {
  Box,
  IconButton,
  Modal,
  ModalProps,
  Stack,
  Typography,
} from '@mui/material'
import useMedia from '@/hook/useMedia'
import ChevronLeft from '@/icons/ChevronLeft'
import CloseIcon from '@/icons/CloseIcon'
import CuButton from './CuButton'
import * as style from './CuModal.style'

interface IModalButton {
  text: string
  onClick: () => void
}
interface ICuModalProps extends ModalProps {
  title: string
  containedButton: IModalButton
  textButton?: IModalButton
  mobileFullSize?: boolean // 기본적으로 false입니다.
}

const getModalWrapperStyle = (isPc: boolean, mobileFullSize?: boolean) => {
  return isPc
    ? style.pcWrapper
    : mobileFullSize
      ? style.mobileFullSizeWrapper
      : style.mobileWrapper
}

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
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={sx}
      keepMounted={!!keepMounted}
    >
      <Stack spacing={'1.5rem'} sx={getModalWrapperStyle(isPc, mobileFullSize)}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          spacing={'1rem'}
        >
          {!isPc && mobileFullSize ? (
            <IconButton onClick={() => onClose} sx={style.headerMobileButton}>
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
          <IconButton onClick={() => onClose} sx={style.headerCloseButton}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Box sx={style.modalContent}>{children}</Box>
        <Stack direction={'row'} spacing={'1rem'} width={'100%'}>
          {textButton ? (
            <CuButton
              variant={'text'}
              message={textButton.text}
              action={textButton.onClick}
              fullWidth
              style={style.textButton}
              TypographyProps={style.textButtonTypo}
            />
          ) : null}
          <CuButton
            variant={'contained'}
            message={containedButton.text}
            action={containedButton.onClick}
            fullWidth
            style={style.containedButton}
            TypographyProps={style.containedButtonTypo}
          />
        </Stack>
      </Stack>
    </Modal>
  )
}

export default CuModal
