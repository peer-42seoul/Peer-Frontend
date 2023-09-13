'use client'

import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Tab,
  Tabs,
  useMediaQuery,
} from '@mui/material'
import { useRouter } from 'next/navigation'

import { Dispatch, SetStateAction, useState } from 'react'

interface INavProps {
  value: number
  setValue: Dispatch<SetStateAction<number>>
}

const PcNav = ({ value, setValue }: INavProps) => {
  const router = useRouter();

  return (
    <Tabs
      orientation="vertical"
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      sx={{ borderRight: 1, borderColor: 'divider' }}
      variant="fullWidth"
    >
      <Tab label="홈" onClick={() => {router.push("/")}}/>
      <Tab label="히치하이킹" onClick={() => {router.push("/")}}/>
      <Tab label="쇼케이스" onClick={() => {router.push("/")}}/>
      <Tab label="팀페이지" onClick={() => {router.push("/")}}/>
      <Tab label="내 프로필" onClick={() => {router.push("/profile/MyPage")}}/>
    </Tabs>
  )
}

const MobileNav = ({ value, setValue }: INavProps) => {
  const router = useRouter();
  
  return (
    (
      <Paper
        sx={{
          width: '100vw',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          overflow: 'hidden',
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        >
          <BottomNavigationAction label="홈" onClick={() => {router.push("/")}} />
          <BottomNavigationAction label="히치하이킹" onClick={() => {router.push("/")}}/>
          <BottomNavigationAction label="쇼케이스" onClick={() => {router.push("/")}}/>
          <BottomNavigationAction label="팀페이지" onClick={() => {router.push("/")}}/>
          <BottomNavigationAction label="내 프로필" onClick={() => {router.push("/profile/MyPage")}}/>
        </BottomNavigation>
      </Paper>
    )
  )
}

const NavBar = () => {
  const isPc = useMediaQuery('(min-width:481px)')
  const [value, setValue] = useState(0)

  return (
    <div>
      {isPc ? (
        <PcNav value={value} setValue={setValue} />
      ) : (
        <MobileNav value={value} setValue={setValue} />
      )}
    </div>
  )
}

export default NavBar
