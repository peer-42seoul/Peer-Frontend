import { ReactNode, useEffect, useState } from 'react'
import {
  Box,
  Checkbox,
  IconButton,
  Modal,
  Stack,
  SxProps,
  Typography,
} from '@mui/material'
import { Help } from '@mui/icons-material'
import useMedia from '@/hook/useMedia'
import { CloseIcon } from '@/icons'
import * as style from './Tutorial.style'

interface ITutorialProps {
  title?: string
  content: ReactNode
  sx?: SxProps
}

const ForceTutorial = ({ title, content, sx }: ITutorialProps) => {
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState(false)
  const { isPc } = useMedia()

  const handleCheck = () => {
    setChecked(!checked)
  }

  const handleClose = () => {
    if (checked) {
      localStorage.setItem('teamListTutorial', 'true')
    }
    setOpen(false)
  }

  useEffect(() => {
    if (!open) {
      const tutorial = localStorage.getItem('teamListTutorial')
      if (tutorial !== 'true') setOpen(true)
    }
  }, [])

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <Help sx={{ color: 'purple.strong', ...sx }} />
      </IconButton>
      <Modal open={open} onClose={handleClose} keepMounted>
        <Stack
          alignItems={'center'}
          sx={isPc ? style.pcModal : style.mobileModal}
        >
          <Typography
            variant={isPc ? 'Title2Emphasis' : 'Body1Emphasis'}
            color="text.normal"
            lineHeight={'2.5rem'}
          >
            {title}
          </Typography>
          <IconButton
            sx={{
              width: '2.5rem',
              height: '2.5rem',
              position: 'absolute',
              top: ['1.5rem', '1.5rem'],
              right: ['1.5rem', '2rem'],
            }}
            onClick={handleClose}
          >
            <CloseIcon
              width={'1.25rem'}
              height={'1.25rem'}
              sx={{ color: 'text.assistive' }}
            />
          </IconButton>
          <Box sx={{ overflowY: 'scroll' }}>{content}</Box>

          <Stack>
            <Stack direction={'row'}>
              <Typography
                variant={'Body1Emphasis'}
                color="text.normal"
                lineHeight={'2.5rem'}
              >
                다시 보지 않기
              </Typography>
              <Checkbox
                checked={checked}
                onChange={handleCheck}
                sx={{
                  color: 'purple.strong',
                  fontSize: '2rem',
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Modal>
    </>
  )
}

export default ForceTutorial
