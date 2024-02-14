import { Avatar, AvatarProps } from '@mui/material'
import * as style from './CuAvatar.style'
import React from 'react'
import Image from 'next/image'

// https://stackoverflow.com/questions/65001113/using-the-new-next-js-image-component-with-material-ui 참고하여 처리하였습니다.

const CuAvatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function CuAvatar(props: AvatarProps, ref) {
    return (
      <Avatar
        {...props}
        sx={{ ...style.CuAvatar, ...props.sx }}
        ref={ref}
        src=""
      >
        {props.children ? (
          props.children
        ) : props.src ? (
          <Image src={props.src} alt={props?.alt || ''} layout="fill" />
        ) : (
          <></>
        )}
      </Avatar>
    )
  },
)

export default CuAvatar
