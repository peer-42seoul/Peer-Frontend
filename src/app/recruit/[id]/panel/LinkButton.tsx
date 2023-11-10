import React from 'react'
import { Button, Popover, Typography } from '@mui/material'

const LinkButton = ({ href }: { href: string }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)
  const id = open ? 'link-popover' : undefined

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        size="large"
        href={href}
        onMouseEnter={handlePopoverOpen}
        sx={{ zIndex: 1301 }}
      >
        소통링크
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ zIndex: 1302 }}
      >
        <Typography sx={{ padding: 2 }}>{href}</Typography>
      </Popover>
    </>
  )
}

export default LinkButton
