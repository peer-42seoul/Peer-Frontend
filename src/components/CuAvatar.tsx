import { Avatar, AvatarProps } from '@mui/material'
import * as style from './CuAvatar.style'

const CuAvatar = (props: AvatarProps) => {
  return (
    <Avatar {...props} sx={style.CuAvatar}>
      {props.children ? props.children : <></>}
    </Avatar>
  )
}

export default CuAvatar
