import React from 'react'
import {
  alpha,
  Button,
  Menu,
  MenuItem,
  SxProps,
  Typography,
} from '@mui/material'
import { KeyboardArrowDown } from '@mui/icons-material'
import { IRole } from '@/types/IPostDetail'
import { useTheme } from '@mui/system'

const ApplyMenuButton = ({
  roleList,
  onApply,
  disabled,
  sx,
}: {
  roleList: IRole[]
  onApply: (selectedRole: string) => void
  disabled: boolean
  sx: SxProps
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null,
  )
  const theme = useTheme()

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
        disableElevation
        onClick={handleMenuClick}
        endIcon={<KeyboardArrowDown />}
        sx={sx}
      >
        <Typography variant={'Body1'} color={'white'}>
          지원하기
        </Typography>
      </Button>
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: alpha(theme.palette.purple.tinted, 0.2),
          },
        }}
      >
        {roleList?.map((role, index) => (
          <MenuItem
            key={index}
            onClick={() => onApply(role?.name)}
            disabled={role?.current >= role?.number}
            sx={{
              ' &.MuiMenuItem-root': {
                width: '8.25rem',
                display: 'flex',
                padding: '0.25rem',
                justifyContent: 'center',
              },
            }}
          >
            <Typography
              variant={'Body1'}
              noWrap
              sx={{
                color: 'text.normal',
                '&:hover ': {
                  color: 'purple.normal',
                },
              }}
            >
              {role?.name} {role?.current}/{role?.number}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default ApplyMenuButton
