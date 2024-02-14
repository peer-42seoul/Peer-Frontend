'use client'
import { Avatar, AvatarProps } from '@mui/material'
import * as style from './CuAvatar.style'
import React, { useState } from 'react'
import Image from 'next/image'

// https://stackoverflow.com/questions/65001113/using-the-new-next-js-image-component-with-material-ui 참고하여 처리하였습니다.

const CuAvatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function CuAvatar(props: AvatarProps, ref) {
    const [error, setError] = useState(false)
    return (
      <Avatar
        {...props}
        sx={{ ...style.CuAvatar, ...props.sx }}
        ref={ref}
        src=""
      >
        {props.children ? (
          props.children
        ) : props.src && !error ? (
          <Image
            src={props.src}
            alt={props?.alt || ''}
            layout="fill"
            onError={() => setError(true)}
          />
        ) : (
          <></>
        )}
      </Avatar>
    )
  },
)

export default CuAvatar
