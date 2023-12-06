'use client'

import { Badge, Drawer, Tab, Tabs } from '@mui/material'
import { IconButton } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { SyntheticEvent, useCallback, useState } from 'react'
import { Box } from '@mui/system'

const AlertIcon = () => {
  const [tabvalue, setTabValue] = useState(0)
  const [isAlertComing, setIsAlertComing] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openAlertTab = useCallback(() => {
    setIsAlertComing(true)
    setIsDrawerOpen(true)
  }, [setIsAlertComing, setIsDrawerOpen])

  const toggleDrawer = useCallback(
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setIsDrawerOpen(open)
    },
    [setIsDrawerOpen],
  )

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <>
      <IconButton color="inherit" aria-label="alert_tab" onClick={openAlertTab}>
        <Badge color="secondary" variant="dot" invisible={isAlertComing}>
          <NotificationsIcon color="primary" />
        </Badge>
      </IconButton>
      <Drawer
        variant="temporary"
        anchor={'right'}
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <Box sx={{ width: 400, mt: 7 }} role="presentation">
          <Tabs value={tabvalue} onChange={handleChange}>
            <Tab label="전체" />
            <Tab label="쪽지" />
            <Tab label="팀활동" />
            <Tab label="공지" />
          </Tabs>
        </Box>
      </Drawer>
    </>
  )
}

export default AlertIcon
