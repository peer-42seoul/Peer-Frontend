'use client'

import { MenuItem, Stack, Typography } from '@mui/material'
import * as style from './dropdownMenu.styles'

const IconMenuItem = ({
  icon,
  text,
  action,
}: {
  icon: React.ReactNode
  text: string
  action?: () => void
}) => {
  const handleClick = () => {
    if (action) {
      action()
    }
  }
  return (
    <MenuItem dense onClick={handleClick}>
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
