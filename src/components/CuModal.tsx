import {
  Box,
  IconButton,
  Modal,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material'
import useMedia from '@/hook/useMedia'
import { ChevronLeft, CloseIcon } from '@/icons'
import { ICuModalProps } from '@/types/ModalTypes'
import CuButton from './CuButton'
import * as style from './CuModal.style'

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
  // sx,
  keepMounted,
  children,
}: ICuModalProps) => {
  const { isPc } = useMedia()
  return (
    <Modal open={open} onClose={onClose} keepMounted={!!keepMounted}>
      <Stack
        spacing={'1.5rem'}
        sx={{ ...getModalWrapperStyle(isPc, mobileFullSize) }}
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
          {isPc && !mobileFullSize ? (
            <IconButton onClick={onClose} sx={style.headerCloseButton}>
              <CloseIcon />
            </IconButton>
          ) : (
            <Box sx={style.headerDummyButton}></Box>
          )}
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
