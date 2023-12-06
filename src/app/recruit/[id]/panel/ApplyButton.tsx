import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { KeyboardArrowDown } from '@mui/icons-material'

const ApplyButton = ({
  role,
  onApply,
}: {
  role: string[]
  onApply: (selectedRole: string) => void
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null,
  )

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    if (menuAnchorEl) {
      setMenuAnchorEl(null)
    } else {
      setMenuAnchorEl(event.currentTarget)
    }
  }

  const handleClose = () => {
    setMenuAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="apply-option-button"
        variant="contained"
        size="large"
        disableElevation
        onClick={handleMenuClick}
        endIcon={<KeyboardArrowDown />}
        // sx={{ zIndex: 1302 }} // TODO : zIndex 문제 해결되면 주석 삭제할 것.
      >
        지원하기
      </Button>
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleClose}
      >
        {role.map((name: string) => (
          <MenuItem key={name} onClick={() => onApply(name)}>
            {name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default ApplyButton
