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
  useMediaQuery,
} from '@mui/material'
import useMedia from '@/hook/useMedia'
import { ChevronLeft } from '@/icons'
import { BetaIcon } from '@/components/BetaBadge'
import * as style from './CuNavBar.style'

interface IBadgeInfo {
  isNew?: boolean
  isBeta?: boolean
  isSoon?: boolean
}

interface IButtonBadgeProps extends IBadgeInfo {
  disabled?: boolean
}

interface ITabInfo extends IBadgeInfo {
  label: string
  mobileLabel?: string
  onClick: () => void
  value: string
  icon: ReactElement
  disabled?: boolean
}

interface ICuNavBarProps {
  getTabValue: (path: string) => string
  title: string
  prevButtonAction?: () => void
  tabletMode?: boolean // 팀 페이지 navBar와 같이 태블릿 사이즈에서도 모바일 sidebar 형태로 보여줄 때 사용
  tabData: ITabInfo[]
}

const CuNavBar = ({
  getTabValue,
  title,
  prevButtonAction,
  tabData,
  tabletMode,
}: ICuNavBarProps) => {
  const pathName = usePathname()
  const [value, setValue] = useState<string | undefined>(undefined)
  const { isPc } = useMedia()
  const isTablet = useMediaQuery('(min-width:480px) and (max-width:997px)') // TODO : useMedia에 추가하는 방안 고려해보기
  const [isPcSidebar, setIsPcSidebar] = useState<boolean>(false)

  const setTabValue = useCallback(() => {
    setValue(getTabValue(pathName))
  }, [pathName, getTabValue])

  useEffect(() => {
    setTabValue()
  }, [setTabValue])

  useEffect(() => {
    if (tabletMode) {
      setIsPcSidebar(!isTablet && isPc)
    } else {
      setIsPcSidebar(isPc)
    }
  }, [isPc, isTablet, tabletMode])

  return (
    <Box sx={isPcSidebar ? style.pcNavBar : style.mobileNavBar}>
      {isPcSidebar && (
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
        orientation={isPcSidebar ? 'vertical' : 'horizontal'}
        fullWidth={false}
        value={value}
        sx={style.tabs}
        exclusive
        onChange={(_event, newValue) => {
          if (newValue) setValue(newValue)
        }}
      >
        {isPcSidebar
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
                  width={(tabletMode ? 180 : 90) / tabData.length}
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
  return (
    <ToggleButton
      value={tab.value}
      onClick={tab.onClick}
      sx={{
        ...style.pcTab,
        ...(tab.isNew || tab.isBeta || tab.isSoon
          ? style.tabWithBadge
          : undefined),
      }}
      disabled={tab.disabled}
      selected={selected}
    >
      <Stack
        minWidth={'6rem'}
        direction={'row'}
        spacing={'0.25rem'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Typography variant={'Caption'}>{tab.label}</Typography>
        <PcButtonBadge
          isNew={tab.isNew}
          isBeta={tab.isBeta}
          isSoon={tab.isSoon}
          disabled={tab.disabled}
        />
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
  return (
    <ToggleButton
      value={tab.value}
      onClick={tab.onClick}
      sx={{ ...style.mobileTab, width: `${width}%` }}
      disabled={tab.disabled}
      selected={selected}
    >
      <Stack direction={'column'} spacing={'0.12rem'} alignItems={'center'}>
        <MobileButtonBadge
          isNew={tab.isNew}
          isBeta={tab.isBeta}
          isSoon={tab.isSoon}
          disabled={tab.disabled}
        >
          <Box sx={style.iconBoxBase}>{tab.icon}</Box>
        </MobileButtonBadge>
        <Typography variant={'Tag'}>{tab.mobileLabel ?? tab.label}</Typography>
      </Stack>
    </ToggleButton>
  )
}

const PcButtonBadge = ({
  isNew,
  isBeta,
  isSoon,
  disabled,
}: IButtonBadgeProps) => {
  if (isNew) {
    return (
      <Typography
        color={disabled ? 'text.disable' : 'yellow.strong'}
        variant={'Caption'}
        sx={style.textBadge}
      >
        NEW
      </Typography>
    )
  }
  if (isBeta) {
    return <BetaIcon sx={{ paddingLeft: '0.5rem' }} />
  }
  if (isSoon) {
    return (
      <Typography
        color={'text.disable'}
        variant={'Caption'}
        sx={style.textBadge}
      >
        SOON
      </Typography>
    )
  }
  return null
}

const getBadgeStyle = (
  isNew?: boolean,
  isBeta?: boolean,
  isSoon?: boolean,
  disabled?: boolean,
) => {
  if (disabled) return style.disabledBadge
  if (isNew) return style.newBadge
  if (isBeta) return style.betaBadge
  if (isSoon) return style.soonBadge
  return undefined
}

const MobileButtonBadge = ({
  isNew,
  isBeta,
  isSoon,
  disabled,
  children,
}: IButtonBadgeProps & {
  children: ReactElement
}) => {
  const badgeStyle = getBadgeStyle(isNew, isBeta, isSoon, disabled)
  const isInvisible = !isNew && !isBeta && !isSoon
  return (
    <Badge
      sx={badgeStyle}
      variant={'dot'}
      invisible={isInvisible}
      color={'primary'}
    >
      {children}
    </Badge>
  )
}

export default CuNavBar
