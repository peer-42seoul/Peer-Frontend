import { Theme } from '@mui/material'

export const CommentContainer = {
  boxSizing: 'border-box',
  padding: '1.5rem 2rem',
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
