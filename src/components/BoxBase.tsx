import React from 'react'
import { Container, SxProps, Theme } from '@mui/material'
import useMedia from '@/hook/useMedia'
import BackgroundBox from './BackgroundBox'

const PCBase = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '80px',
}

const MobileBase = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '80px 16px',
}

const BoxBase = ({
  children,
  mobileSx,
  pcSx,
}: {
  children: React.ReactNode
  mobileSx: SxProps<Theme> | undefined
  pcSx: SxProps<Theme> | undefined
}) => {
  const { isPc } = useMedia()
  return (
    <Container sx={isPc ? PCBase : MobileBase}>
      <BackgroundBox pcSx={pcSx} mobileSx={mobileSx}>
        {children}
      </BackgroundBox>
    </Container>
  )
}

export default BoxBase
