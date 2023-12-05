import React from 'react'
import Modal, { ModalProps } from '@mui/material/Modal'
import { Box, IconButton, Stack, SxProps, Typography } from '@mui/material'
import useMedia from '@/hook/useMedia'
import ChevronLeft from '@/icons/ChevronLeft'
import CloseIcon from '@/icons/CloseIcon'
import * as style from './CuModal.style'
import CuButton from './CuButton'

//   여기 있는 state를 쓰면 됩니다.
//   const [open, setOpen] = useState(false)
//   const handleOpen = () => setOpen(true) // 다른 버튼이나 요소를 얘를 활용해서 모달 핸들링 가능
//   const handleClose = () => setOpen(false)

const defaultstyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const MobileMessagetstyle = {
  display: 'flex',
  width: '100%',
  height: '100svh',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

interface ICuModal {
  open: boolean
  handleClose: () => void
  children: React.ReactNode
  ariaTitle: string
  ariaDescription: string
  sx?: SxProps
  style?: SxProps
  keepMounted?: boolean
}

const CuModal = ({
  open,
  handleClose,
  children,
  ariaTitle,
  ariaDescription,
  sx,
  style = defaultstyle,
  keepMounted,
}: ICuModal) => {
  const { isPc } = useMedia()

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={ariaTitle}
        aria-describedby={ariaDescription}
        sx={sx}
        keepMounted={keepMounted}
      >
        <Box sx={style ? style : isPc ? defaultstyle : MobileMessagetstyle}>
          {children}
        </Box>
      </Modal>
    </>
  )
}

export default CuModal

interface ICuModalProps extends ModalProps {
  title?: string
  mobileFullSize?: boolean // 기본적으로 false입니다.
  primaryButton: {
    text: string
    onClick: () => void
  }
  secondaryButton?: {
    text: string
    onClick: () => void
  }
}

const getModalWrapperStyle = (isPc: boolean, mobileFullSize?: boolean) => {
  return isPc
    ? style.pcWrapper
    : mobileFullSize
      ? style.mobileFullSizeWrapper
      : style.mobileWrapper
}

const CuCuModal = ({
  title,
  primaryButton,
  secondaryButton,
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
      sx={{ ...sx, ...getModalWrapperStyle(isPc, mobileFullSize) }}
      keepMounted={!!keepMounted}
    >
      <Stack spacing={'1.5rem'}>
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
        <Box>{children}</Box>
        <Stack direction={'row'} spacing={'1rem'}>
          {secondaryButton ? (
            <CuButton
              variant={'text'}
              message={secondaryButton.text}
              action={secondaryButton.onClick}
            />
          ) : null}
          <CuButton
            variant={'contained'}
            message={primaryButton.text}
            action={primaryButton.onClick}
          />
        </Stack>
      </Stack>
    </Modal>
  )
}

export { CuCuModal }
