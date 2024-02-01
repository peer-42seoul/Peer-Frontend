import { ReactNode, useState } from 'react'
import { Box, IconButton, Modal, Stack, Typography } from '@mui/material'
import { Help } from '@mui/icons-material'
import useMedia from '@/hook/useMedia'
import { CloseIcon } from '@/icons'
import * as style from './Tutorial.style'

interface ITutorialProps {
  title?: string
  content: ReactNode
}

const Tutorial = ({ title, content }: ITutorialProps) => {
  const [open, setOpen] = useState(false)
  const { isPc } = useMedia()
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <Help sx={{ color: 'purple.strong' }} />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)} keepMounted>
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
            onClick={() => setOpen(false)}
          >
            <CloseIcon
              width={'1.25rem'}
              height={'1.25rem'}
              sx={{ color: 'text.assistive' }}
            />
          </IconButton>
          <Box sx={{ overflowY: 'scroll' }}>{content}</Box>
        </Stack>
      </Modal>
    </>
  )
}

export default Tutorial
