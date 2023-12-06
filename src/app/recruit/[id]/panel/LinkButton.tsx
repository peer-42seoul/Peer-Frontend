import React from 'react'
import { Button, Popover, Typography } from '@mui/material'

const LinkButton = ({
  href,
  variant,
}: {
  href: string
  variant: 'text' | 'outlined' | 'contained'
}) => {
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
    <div>
      <Button
        aria-describedby={id}
        variant={variant}
        size="large"
        href={href}
        onMouseEnter={handlePopoverOpen}
        // sx={{ zIndex: 1304 }} // TODO : zIndex 문제 해결되면 주석 삭제할 것.
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
        // sx={{ zIndex: 1303 }} // TODO : zIndex 문제 해결되면 주석 삭제할 것.
        container={() => document.getElementById('modal-root')}
      >
        <Typography sx={{ padding: 2 }}>{href}</Typography>
      </Popover>
    </div>
  )
}

export default LinkButton
