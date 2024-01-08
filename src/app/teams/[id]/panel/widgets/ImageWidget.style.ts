import { SxProps } from '@mui/material'
import React from 'react'

export const CardContentStyle: SxProps = {
  boxSizing: 'border-box',
  height: '100%',
  width: '100%',
  padding: '1px',
  backgroundColor: 'background.tertiary',
}

export const ContentDivStyle: React.CSSProperties = {
  height: '100%',
  width: '100%',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
}

export const ButtonDivStyle: React.CSSProperties = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
}

export const IconButtonStyle: SxProps = {
  backgroundColor: 'text.assistive',
  width: '3rem',
  height: '3rem',
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: 'text.assistive',
  },
}
