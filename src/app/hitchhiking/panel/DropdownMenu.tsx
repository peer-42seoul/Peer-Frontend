import React from 'react'
import { Button, Menu, MenuItem, Stack, Typography } from '@mui/material'
import ShareIcon from '@/icons/ShareIcon'
import MoreHorizontalIcon from '@/icons/MoreHorizontalIcon'
import ReportIcon from '@/icons/ReportIcon'

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
    <MenuItem onClick={handleClose}>
      <Stack direction={'row'} spacing={'0.38rem'} alignItems={'center'}>
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
      >
        <MoreHorizontalIcon
          sx={{
            color: 'text.alternative',
            width: '1.25rem',
            height: '1.25rem',
          }}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <IconMenuItem
          handleClose={handleClose}
          icon={
            <ShareIcon
              sx={{
                color: 'text.alternative',
                width: '1.25rem',
                height: '1.25rem',
              }}
            />
          }
          text={'공유하기'}
        />
        <IconMenuItem
          handleClose={handleClose}
          icon={
            <ReportIcon
              sx={{
                color: 'text.alternative',
                width: '1.25rem',
                height: '1.25rem',
              }}
            />
          }
          text={'신고하기'}
        />
      </Menu>
    </div>
  )
}
export default DropdownMenu
