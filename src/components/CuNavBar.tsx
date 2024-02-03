import { useState, ReactElement, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import {
  Box,
  Typography,
  Stack,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Badge,
} from '@mui/material'
import useMedia from '@/hook/useMedia'
import { ChevronLeft } from '@/icons'
import * as style from './CuNavBar.style'

interface ITabInfo {
  label: string
  mobileLabel?: string
  onClick: () => void
  value: string
  icon: ReactElement
  disabled?: boolean
  new?: boolean
}

interface ICuNavBarProps {
  getTabValue: (path: string) => string
  title: string
  prevButtonAction?: () => void
  tabData: ITabInfo[]
}

const CuNavBar = ({
  getTabValue,
  title,
  prevButtonAction,
  tabData,
}: ICuNavBarProps) => {
  const pathName = usePathname()
  const [value, setValue] = useState<string | undefined>(undefined)
  const { isPc } = useMedia()

  const setTabValue = useCallback(() => {
    setValue(getTabValue(pathName))
  }, [pathName, getTabValue])

  useEffect(() => {
    setTabValue()
  }, [setTabValue])

  return (
    <Box sx={isPc ? style.pcNavBar : style.mobileNavBar}>
      {isPc && (
        <Stack
          direction={'row'}
          justifyContent={'flex-start'}
          alignItems={'center'}
          height={'2.5rem'}
        >
          {prevButtonAction ? (
            <IconButton onClick={prevButtonAction}>
              <ChevronLeft width={'1.5rem'} height={'1.5rem'} />
            </IconButton>
          ) : null}
          <Typography variant={'Body2Emphasis'}>{title}</Typography>
        </Stack>
      )}
      <ToggleButtonGroup
        orientation={isPc ? 'vertical' : 'horizontal'}
        fullWidth={false}
        value={value}
        sx={style.tabs}
        exclusive
        onChange={(_event, newValue) => {
          if (newValue) setValue(newValue)
        }}
      >
        {isPc
          ? [
              tabData.map((tab) => (
                <PcToggleButton
                  key={crypto.randomUUID()}
                  tab={tab}
                  selected={value === tab.value}
                />
              )),
            ]
          : [
              tabData.map((tab) => (
                <MobileToggleButton
                  key={crypto.randomUUID()}
                  tab={tab}
                  selected={value === tab.value}
                  width={90 / tabData.length}
                />
              )),
            ]}
      </ToggleButtonGroup>
    </Box>
  )
}
const PcToggleButton = ({
  tab,
  selected,
}: {
  tab: ITabInfo
  selected: boolean
}) => {
  const isNewTab = tab.new && !tab.disabled
  return (
    <ToggleButton
      value={tab.value}
      onClick={tab.onClick}
      sx={{
        ...style.pcTab,
        ...(isNewTab ? style.newTab : undefined),
      }}
      disabled={tab.disabled}
      selected={selected}
    >
      <Stack
        direction={'row'}
        spacing={'0.25rem'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Typography variant={'Caption'}>{tab.label}</Typography>
        {isNewTab && (
          <Typography sx={style.newTextBadge} variant={'Caption'}>
            NEW
          </Typography>
        )}
      </Stack>
    </ToggleButton>
  )
}
const MobileToggleButton = ({
  tab,
  selected,
  width,
}: {
  tab: ITabInfo
  selected: boolean
  width: number
}) => {
  const isNewTab = tab.new && !tab.disabled
  return (
    <ToggleButton
      value={tab.value}
      onClick={tab.onClick}
      sx={{ ...style.mobileTab, width: `${width}%` }}
      disabled={tab.disabled}
      selected={selected}
    >
      <Stack direction={'column'} spacing={'0.12rem'} alignItems={'center'}>
        <Badge sx={style.newBadge} variant={'dot'} invisible={!isNewTab}>
          <Box sx={style.iconBoxBase}>{tab.icon}</Box>
        </Badge>
        <Typography variant={'Tag'}>{tab.mobileLabel ?? tab.label}</Typography>
      </Stack>
    </ToggleButton>
  )
}

export default CuNavBar
