import { Button, Drawer, List, ListItem, ListItemButton } from '@mui/material'
import React, { useState } from 'react'
import { IRole } from '@/types/IPostDetail'

const ApplyDrawerButton = ({
  roleList,
  handleApply,
  disabled,
}: {
  roleList: IRole[]
  handleApply: (role: string) => void
  disabled: boolean
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Drawer
        anchor={'bottom'}
        open={open}
        onClose={() => setOpen(false)}
        sx={{ zIndex: 1500 }}
      >
        <List>
          {roleList.map(({ name }) => (
            <ListItem key={name}>
              <ListItemButton
                onClick={() => {
                  setOpen(false)
                  handleApply(name)
                }}
              >
                {name}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Button
        fullWidth
        variant="contained"
        size="large"
        disabled={disabled}
        onClick={() => {
          setOpen(true)
        }}
      >
        지원하기
      </Button>
    </>
  )
}
export default ApplyDrawerButton
