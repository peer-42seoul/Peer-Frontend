'use client'
import React from 'react'
import { Button, Menu, MenuItem, Stack, Typography } from '@mui/material'
import ShareIcon from '@/icons/ShareIcon'
import MoreHorizontalIcon from '@/icons/MoreHorizontalIcon'
import ReportIcon from '@/icons/ReportIcon'
import useMedia from '@/hook/useMedia'
import * as style from './DropdownMenu.style'

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

// TODO : 신고하기 기능 구현, 수정하기 버튼 구현
const DropdownMenu = ({
  title,
  url,
  content,
}: {
  title: string
  url: string
  content: string
  // COMMENT : #460이 머지되어야 사용 가능
  setInfoToastMessage?: (message: string) => void
  openInfoToast?: () => void
  setErrorToastMessage?: (message: string) => void
  openErrorToast?: () => void
}) => {
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

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: url,
          text: content,
        })
        .then(() => {
          handleClose()
          // setInfoToastMessage('공유하기가 완료되었습니다.')
          // openInfoToast()
        })
        .catch((e) => {
          console.error(e)
          // setErrorToastMessage('공유를 실패했습니다.')
          // openErrorToast()
        })
    } else {
      // setErrorToastMessage('공유하기를 지원하지 않는 브라우저입니다.')
      // openErrorToast()
      handleClose()
    }
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
      >
        <MenuItem
          onClick={handleClose}
          sx={{ ...style.menuItemStyle, position: 'relative' }}
        >
          <MoreHorizontalIcon
            sx={{
              ...style.dropdownMenuIconStyleBase,
              transform: isPc || anchorEl ? 'rotate(0deg)' : 'rotate(90deg)',
              color: 'text.alternative',
            }}
          />
        </MenuItem>
        <IconMenuItem
          action={handleShare}
          icon={
            <ShareIcon
              sx={{
                ...style.menuItemIconStyleBase,
                padding: '0.125rem',
                color: 'text.alternative',
              }}
            />
          }
          text={'공유'}
        />
        <IconMenuItem
          action={handleClose}
          icon={
            <ReportIcon
              sx={{ ...style.menuItemIconStyleBase, color: 'text.alternative' }}
            />
          }
          text={'신고'}
        />
      </Menu>
    </div>
  )
}
export default DropdownMenu
