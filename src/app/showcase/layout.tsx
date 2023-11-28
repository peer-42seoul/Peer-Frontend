import { Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

const ShowcaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Stack className="layout" height={'80vh'} overflow={'hidden'}>
      <Stack
        position={'fixed'}
        zIndex={5}
        p={2}
        sx={{ backgroundColor: 'background.primary' }}
        width={'100%'}
      >
        <Typography variant="h5" fontWeight={'bold'} textAlign={'center'}>
          쇼케이스
        </Typography>
      </Stack>
      <Stack className="layout__content">{children}</Stack>
    </Stack>
  )
}

export default ShowcaseLayout
