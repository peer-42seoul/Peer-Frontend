import { SxProps } from '@mui/system'
import React from 'react'

export const CardStyle: SxProps = {
  width: '100%',
  height: '100%',
  backgroundColor: 'background.tertiary',
  padding: '0',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '1rem',
}

export const CardContentStyle: SxProps = {
  height: 'calc(100% - 2px)',
  width: 'calc(100% - 2px)',
  padding: '1px',
  '&:last-child': {
    paddingBottom: '1px',
  },
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
