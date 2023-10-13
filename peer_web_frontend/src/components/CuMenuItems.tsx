import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import { Box } from '@mui/material'
import useMessageStore from '@/states/useMessageStore'

export default function MenuItems({ letterTarget }: any) {
  const selectMessageTarget = (targetId: number) => {
    console.log('targetId', targetId)
    useMessageStore.setState({
      storedSelectedUser: targetId,
    })
  }
  return (
    <div>
      {letterTarget.map((item: any) => {
        return (
          <>
            <Box
              onClick={() => selectMessageTarget(item.targetId)}
              key={item.targetId}
            >
              <MenuItem>
                {item.targetNickname ? (
                  <span>{item.targetNickname}</span>
                ) : (
                  <span>{item.targetEmail}</span>
                )}
              </MenuItem>
            </Box>
          </>
        )
      })}
    </div>
  )
}
