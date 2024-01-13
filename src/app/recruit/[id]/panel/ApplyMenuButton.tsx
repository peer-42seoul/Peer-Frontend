import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { KeyboardArrowDown } from '@mui/icons-material'
import { IRole } from '@/types/IPostDetail'

const ApplyMenuButton = ({
  roleList,
  onApply,
  disabled,
}: {
  roleList: IRole[]
  onApply: (selectedRole: string) => void
  disabled: boolean
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
        disabled={disabled}
        id="apply-option-button"
        variant="contained"
        size="large"
        sx={{ width: '6.785rem' }}
        disableElevation
        onClick={handleMenuClick}
        endIcon={<KeyboardArrowDown />}
      >
        지원하기
      </Button>
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleClose}
      >
        {roleList?.map((role, index) => (
          <MenuItem
            key={index}
            onClick={() => onApply(role?.name)}
            disabled={role?.current >= role?.number}
          >
            {role?.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default ApplyMenuButton
