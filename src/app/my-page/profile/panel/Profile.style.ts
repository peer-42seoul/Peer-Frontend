import { SxProps } from '@mui/material'
import React from 'react'

const formPcStyle: React.CSSProperties = {
  height: '100%',
}
const formMobileStyle: React.CSSProperties = {
  height: '100%',
  marginTop: '1rem',
}

const profileImageInputStyle: SxProps = {
  position: 'relative',
  width: '4rem',
  height: '4rem',
  borderRadius: '500px',
}

const trashIconStyle: SxProps = {
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

const plusIconStyle: SxProps = {
  color: 'text.normal',
  height: '1.5rem',
  width: '1.5rem',
}

const avatarStyle: SxProps = {
  position: 'absolute',
  top: '0',
  left: '0',
  height: '100%',
  width: '100%',
  bgcolor: 'background.tertiary',
  border: '1px solid',
  borderColor: 'line.alternative',
}

const introductionMaxLengthStyle: SxProps = {
  position: 'absolute',
  bottom: '2rem',
  right: '1.5rem',
}

const cropBoxStyle: React.CSSProperties = {
  borderRadius: '50%',
  width: '100%',
  height: '100%',
  display: 'none',
}

const squareBoxStyle: React.CSSProperties = {
  width: '100%',
  height: 0,
  paddingBottom: '100%',
  position: 'relative',
}

const profileCardPcStyle: SxProps = {
  padding: '1.5rem',
  backgroundColor: 'background.secondary',
  borderRadius: '1rem',
}

const profileCardMobileStyle: SxProps = {
  padding: '1rem',
  paddingTop: '0.5rem',
  backgroundColor: 'background.secondary',
  borderRadius: '1rem',
}

const profileImageModalStyle: SxProps = {
  width: '80%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  border: 'none',
  outline: 'none',
  transform: 'translate(-50%, -50%)',
  maxWidth: '20rem',
  maxHeight: '20rem',
}

const profileImageStyle: SxProps = {
  width: '3rem',
  height: '3rem',
}

const faviconStyle: SxProps = {
  width: '1.25rem',
  height: '1.25rem',
  backgroundColor: 'text.normal',
}

export {
  formPcStyle,
  formMobileStyle,
  profileImageInputStyle,
  trashIconStyle,
  plusIconStyle,
  avatarStyle,
  introductionMaxLengthStyle,
  cropBoxStyle,
  squareBoxStyle,
  profileCardPcStyle,
  profileCardMobileStyle,
  profileImageModalStyle,
  profileImageStyle,
  faviconStyle,
}
