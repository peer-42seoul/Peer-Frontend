import { Box, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

const NoticeEditContainer = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => {
  return (
    <Stack width={'100%'}>
      <Typography>{title}</Typography>
      <Box>{children}</Box>
    </Stack>
  )
}

export default NoticeEditContainer
