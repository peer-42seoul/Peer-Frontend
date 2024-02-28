'use client'

import { MenuItem, Stack, Typography } from '@mui/material'
import * as style from './dropdownMenu.styles'

const IconMenuItem = ({
  icon,
  text,
  action,
  disabled,
}: {
  icon: React.ReactNode
  text: string
  action?: () => void
  disabled?: boolean
}) => {
  const handleClick = () => {
    if (action) {
      action()
    }
  }
  return (
    <MenuItem dense onClick={handleClick} disabled={disabled}>
      <Stack
        direction={'row'}
        spacing={'0.375rem'}
        alignItems={'center'}
        justifyContent={'center'}
        sx={style.menuItemStyle}
      >
        {icon}
        <Typography variant="Caption" color={'text.alternative'}>
          {text}
        </Typography>
      </Stack>
    </MenuItem>
  )
}

export default IconMenuItem
