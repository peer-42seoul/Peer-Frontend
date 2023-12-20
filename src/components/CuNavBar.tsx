import { useState, ReactElement, useEffect } from 'react'
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

  useEffect(() => {
    setValue(getTabValue(pathName))
  }, [pathName])

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
        value={value}
        sx={style.tabs}
        exclusive
        onChange={(_event, newValue) => {
          setValue(newValue)
        }}
      >
        {isPc ? (
          [
            tabData.map((tab, index) => (
              <PcToggleButton
                key={index}
                tab={tab}
                selected={value === tab.value}
              />
            )),
          ]
        ) : (
          <Box
            width={'100%'}
            display="grid"
            gridTemplateColumns={`repeat(${tabData.length}, 1fr)`}
            gap={'0.5rem'}
          >
            {tabData.map((tab, index) => (
              <MobileToggleButton
                key={index}
                tab={tab}
                selected={value === tab.value}
              />
            ))}
          </Box>
        )}
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
        <Box
          sx={
            selected
              ? style.selectedIconBox
              : tab.disabled
                ? style.disabledIconBox
                : style.iconBox
          }
        >
          {tab.icon}
        </Box>
        <Typography
          variant={'Caption'}
          color={
            selected
              ? 'purple.strong'
              : tab.disabled
                ? 'custom.disabledNavTab'
                : 'text.assistive'
          }
        >
          {tab.label}
        </Typography>
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
}: {
  tab: ITabInfo
  selected: boolean
}) => {
  const isNewTab = tab.new && !tab.disabled
  return (
    <ToggleButton
      value={tab.value}
      onClick={tab.onClick}
      sx={style.mobileTab}
      disabled={tab.disabled}
      selected={selected}
    >
      <Stack direction={'column'} spacing={'0.12rem'} alignItems={'center'}>
        <Badge sx={style.newBadge} variant={'dot'} invisible={!isNewTab}>
          <Box
            sx={
              selected
                ? style.selectedIconBox
                : tab.disabled
                  ? style.disabledIconBox
                  : style.iconBox
            }
          >
            {tab.icon}
          </Box>
        </Badge>
        <Typography
          variant={'Tag'}
          color={
            selected
              ? 'purple.strong'
              : tab.disabled
                ? 'custom.disabledNavTab'
                : 'text.assistive'
          }
        >
          {tab.mobileLabel ?? tab.label}
        </Typography>
      </Stack>
    </ToggleButton>
  )
}

export default CuNavBar
