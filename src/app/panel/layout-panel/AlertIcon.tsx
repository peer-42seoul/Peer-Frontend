'use client'

// import { Badge, Drawer, Tab, Tabs } from '@mui/material'
import { Badge } from '@mui/material'
import { IconButton } from '@mui/material'
// import { SyntheticEvent, useCallback, useState } from 'react'
// import { Box } from '@mui/system'
import NotificationIcon from '@/icons/NotificationIcon'
import useMedia from '@/hook/useMedia'
import CuModal from '@/components/CuModal'
import ForbiddenDolphin from '@/components/WorkingDolphin'
import useModal from '@/hook/useModal'

const AlertIcon = () => {
  const isAlertComing = false
  // const [tabvalue, setTabValue] = useState(0)
  // const [isAlertComing, setIsAlertComing] = useState(false)
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const { isPc } = useMedia()
  const { isOpen, openModal, closeModal } = useModal()

  // const openAlertTab = useCallback(() => {
  //   setIsAlertComing(true)
  //   setIsDrawerOpen(true)
  // }, [setIsAlertComing, setIsDrawerOpen])

  // const toggleDrawer = useCallback(
  //   (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
  //     if (
  //       event.type === 'keydown' &&
  //       ((event as React.KeyboardEvent).key === 'Tab' ||
  //         (event as React.KeyboardEvent).key === 'Shift')
  //     ) {
  //       return
  //     }

  //     setIsDrawerOpen(open)
  //   },
  //   [setIsDrawerOpen],
  // )

  // const handleChange = (e: SyntheticEvent, newValue: number) => {
  //   setTabValue(newValue)
  // }

  return (
    <>
      <IconButton color="inherit" aria-label="alert_tab" onClick={openModal}>
        <Badge color="secondary" variant="dot" invisible={isAlertComing}>
          <NotificationIcon
            sx={{
              color: isPc ? 'text.alternative' : 'text.normal',
              width: '1.25rem',
              height: '1.25rem',
            }}
          />
        </Badge>
      </IconButton>
      <CuModal open={isOpen} onClose={closeModal} title="잠깐!">
        <ForbiddenDolphin message="알림 기능은 조금만 기다려주세요!!" />
      </CuModal>
      {/* <Drawer
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
      </Drawer> */}
    </>
  )
}

export default AlertIcon
