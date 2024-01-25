import * as React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import { SxProps, Typography } from '@mui/material'

interface ISplitButtonItemProps {
  option: string
  disabled?: boolean
}

export const SplitButtonMenuItem = ({
  option,
  selectedOption,
  setSelectedOption,
  setOpen,
  disabled = false,
}: {
  option: string
  selectedOption: string
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  disabled?: boolean
}) => {
  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    option: string,
  ) => {
    event.stopPropagation()
    if (selectedOption === option) {
      setSelectedOption('')
    } else {
      setSelectedOption(option)
    }
    setOpen(false)
  }
  return (
    <MenuItem
      selected={option === selectedOption}
      onClick={(event) => handleMenuItemClick(event, option)}
      disabled={disabled}
    >
      <Typography variant="Caption">{option}</Typography>
    </MenuItem>
  )
}

const SplitButton = ({
  selectedOption,
  setSelectedOption,
  onClick,
  buttonText,
  sx,
  optionButtonProps,
}: {
  selectedOption: string
  onClick?: () => void
  buttonText?: string
  sx?: SxProps
  optionButtonProps: Array<ISplitButtonItemProps>
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [open, setOpen] = React.useState(false)

  const anchorRef = React.useRef<HTMLDivElement>(null)

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpen((prevOpen) => !prevOpen)
  }

  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onClick) {
      onClick()
    }
    setOpen(false)
  }

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
        sx={sx}
      >
        <Button onClick={handleOnClick}>
          {/* 라이트모드에서도 글자가 흰색으로 보이도록 우선 white로 설정 */}
          <Typography
            variant="CaptionEmphasis"
            color="white"
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {buttonText ?? selectedOption}
          </Typography>
        </Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        // disablePortal
        placement="bottom"
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'center top',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  id="split-button-menu"
                  autoFocusItem
                  onClick={(e) => e.stopPropagation()}
                >
                  {optionButtonProps.map((optionButtonProp) => (
                    <SplitButtonMenuItem
                      key={optionButtonProp.option}
                      {...optionButtonProp}
                      disabled={optionButtonProp.disabled}
                      setOpen={setOpen}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                    />
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  )
}

export default SplitButton
