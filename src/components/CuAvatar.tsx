import { Avatar, AvatarProps } from '@mui/material'
import * as style from './CuAvatar.style'
import React from 'react'

const CuAvatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function CuAvatar(props: AvatarProps, ref) {
    return (
      <Avatar {...props} sx={{ ...style.CuAvatar, ...props.sx }} ref={ref}>
        {props.children ? props.children : <></>}
      </Avatar>
    )
  },
)

export default CuAvatar
