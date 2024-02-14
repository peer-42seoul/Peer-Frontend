import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material'
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
          {roleList.map((role) => (
            <ListItem key={role?.name}>
              <ListItemButton
                onClick={() => {
                  setOpen(false)
                  handleApply(role?.name)
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
        <Typography variant={'Body1'} color={'white'}>
          {disabled ? '마감' : '지원하기'}
        </Typography>
      </Button>
    </>
  )
}
export default ApplyDrawerButton
