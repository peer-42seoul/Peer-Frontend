import { Theme } from '@mui/material'

export const CommentContainer = {
  boxSizing: 'border-box',
  borderRadius: '0.75rem 0.75rem 0rem 0rem',
  background: (theme: Theme) => theme.palette.background.secondary,
}

export const CommentContentWrapper = {
  flex: '1 0 0',
}

export const Avatar = {
  width: '1.5rem',
  height: '1.5rem',
}

export const IconButton = {
  padding: 0,
}

export const Icon = {
  width: '1.5rem',
  height: '1.5rem',
  color: (theme: Theme) => theme.palette.text.assistive,
}

export const SendIcon = {
  width: '1.25rem',
  height: '1.25rem',
  color: (theme: Theme) => theme.palette.text.normal,
}

export const CommentForm = {
  background: (theme: Theme) => theme.palette.background.tertiary,
}
