import { Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

const ShowcaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Stack className="layout" height={'80vh'} overflow={'hidden'}>
      <Typography variant="h5" fontWeight={'bold'} textAlign={'center'} m={2}>
        쇼케이스
      </Typography>
      <Stack className="layout__content">{children}</Stack>
    </Stack>
  )
}

export default ShowcaseLayout
