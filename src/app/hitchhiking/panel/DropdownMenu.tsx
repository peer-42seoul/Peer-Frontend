import React from 'react'
import { Button, Menu, MenuItem, Stack, Typography } from '@mui/material'
import ShareIcon from '@/icons/ShareIcon'
import MoreHorizontalIcon from '@/icons/MoreHorizontalIcon'
import ReportIcon from '@/icons/ReportIcon'
import useMedia from '@/hook/useMedia'
import * as style from './DropdownMenu.style'

const IconMenuItem = ({
  handleClose,
  icon,
  text,
}: {
  handleClose: () => void
  icon: React.ReactNode
  text: string
}) => {
  return (
    <MenuItem dense onClick={handleClose} sx={style.menuItemStyle}>
      <Stack
        direction={'row'}
        spacing={'0.375rem'}
        alignItems={'center'}
        justifyContent={'center'}
        sx={style.menuContentStyle}
      >
        {icon}
        <Typography variant="Caption" color={'text.alternative'}>
          {text}
        </Typography>
      </Stack>
    </MenuItem>
  )
}

const DropdownMenu = () => {
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
        sx={{
          width: '2.5rem',
          height: '2.5rem',
          boxSizing: 'border-box',
          p: '0.0625rem',
        }}
      >
        <MoreHorizontalIcon
          sx={{
            color: 'text.alternative',
            width: '1.25rem',
            height: '1.25rem',
            boxSizing: 'border-box',
            transform: isPc || anchorEl ? 'rotate(0deg)' : 'rotate(90deg)',
            transition: 'transform 0.2s ease-in-out',
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
      >
        <MenuItem
          onClick={handleClose}
          sx={{ ...style.menuItemStyle, position: 'relative' }}
        >
          <MoreHorizontalIcon
            sx={{
              color: 'text.alternative',
              width: '1.25rem',
              height: '1.25rem',
              boxSizing: 'border-box',
              transform: isPc || anchorEl ? 'rotate(0deg)' : 'rotate(90deg)',
              transition: 'transform 0.2s ease-in-out',
              position: 'absolute',
              right: '0.6rem',
            }}
          />
        </MenuItem>
        <IconMenuItem
          handleClose={handleClose}
          icon={
            <ShareIcon
              sx={{
                color: 'text.alternative',
                width: '1.5rem',
                height: '1.5rem',
                padding: '0.125rem',
                boxSizing: 'border-box',
              }}
            />
          }
          text={'공유'}
        />
        <IconMenuItem
          handleClose={handleClose}
          icon={
            <ReportIcon
              sx={{
                color: 'text.alternative',
                width: '1.5rem',
                height: '1.5rem',
              }}
            />
          }
          text={'신고'}
        />
      </Menu>
    </div>
  )
}
export default DropdownMenu
