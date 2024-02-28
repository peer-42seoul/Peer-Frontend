import { SxProps } from '@mui/material'
import React from 'react'
import * as titleBoxStyle from '@/components/TitleBox.style'

export const formPcStyle: React.CSSProperties = {
  height: '100%',
}

export const formMobileStyle: React.CSSProperties = {
  height: '100%',
  marginTop: '1rem',
}

export const profileImageInputStyle: SxProps = {
  position: 'relative',
  width: '4rem',
  height: '4rem',
  borderRadius: '500px',
}

export const trashIconStyle: SxProps = {
  color: 'text.normal',
  opacity: 0,
  height: '1.25rem',
  width: '1.25rem',
  padding: '22px',
  border: '1px solid',
  borderColor: 'line.alternative',
  borderRadius: '500px',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 200,
  '&:hover': {
    opacity: 1,
  },
}

export const plusIconStyle: SxProps = {
  color: 'text.normal',
  height: '1.5rem',
  width: '1.5rem',
}

export const avatarStyle: SxProps = {
  position: 'absolute',
  top: '0',
  left: '0',
  height: '100%',
  width: '100%',
  bgcolor: 'background.tertiary',
  border: '1px solid',
  borderColor: 'line.alternative',
}

export const introductionMaxLengthStyle: SxProps = {
  position: 'absolute',
  bottom: '1.5rem',
  right: '1.5rem',
}

export const cropBoxStyle: React.CSSProperties = {
  borderRadius: '50%',
  width: '100%',
  height: '100%',
  display: 'none',
}

export const squareBoxStyle: React.CSSProperties = {
  width: '100%',
  height: 0,
  paddingBottom: '100%',
  position: 'relative',
}

export const profileCardPcStyle: SxProps = {
  padding: '1.5rem',
  backgroundColor: 'background.secondary',
  borderRadius: '1rem',
}

export const profileCardMobileStyle: SxProps = {
  padding: '1rem',
  paddingTop: '0.5rem',
  backgroundColor: 'background.secondary',
  borderRadius: '1rem',
}

export const profileImageModalStyle: SxProps = {
  width: '80vw',
  height: '80vw',
  position: 'absolute',
  top: '50%',
  left: '50%',
  border: 'none',
  outline: 'none',
  transform: 'translate(-50%, -50%)',
  maxWidth: '20rem',
  maxHeight: '20rem',
}

export const profileImageBoxStyle: SxProps = {
  position: 'absolute',
  width: '100%',
  height: '100%',
}

export const profileImageStyle: SxProps = {
  width: '3rem',
  height: '3rem',
}

export const faviconStyle: SxProps = {
  width: '1.25rem',
  height: '1.25rem',
  backgroundColor: 'text.normal',
}

export const profileIntroductionStyle: SxProps = {
  width: '100%',
  wordBreak: 'pre',
  wordWrap: 'break-word',
  whiteSpace: 'pre-line',
  minHeight: '4.5rem',
  display: 'block',
}

export const myPortfolioStyle: SxProps = {
  ...titleBoxStyle.titleBoxStyle,
  px: [undefined, '1rem'],
  pb: [undefined, '1rem'],
  position: [undefined, 'relative'],
}
