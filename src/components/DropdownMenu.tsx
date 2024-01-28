'use client'
import React from 'react'
import { Button, Menu, MenuItem, Fade } from '@mui/material'
import MoreHorizontalIcon from '@/icons/MoreHorizontalIcon'
import useMedia from '@/hook/useMedia'
import * as style from './DropdownMenu.style'
import * as dropdownMenuStyle from './dropdownMenu/dropdownMenu.styles'

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const { isPc } = useMedia()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={style.dropdownMenuButtonStyle}
      >
        <MoreHorizontalIcon
          sx={{
            ...style.dropdownMenuIconStyleBase,
            transform: isPc || anchorEl ? 'rotate(0deg)' : 'rotate(90deg)',
            color: 'text.alternative',
          }}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          dense: true,
          sx: style.dropdownMenuStyle,
        }}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 300 }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{ ...dropdownMenuStyle.menuItemStyle, position: 'relative' }}
        >
          <MoreHorizontalIcon
            sx={{
              ...style.dropdownMenuIconStyleBase,
              position: 'absolute',
              right: '0.6rem',
              transform: isPc || anchorEl ? 'rotate(0deg)' : 'rotate(90deg)',
              color: 'text.alternative',
            }}
          />
        </MenuItem>
        {children}
      </Menu>
    </div>
  )
}
export default DropdownMenu
