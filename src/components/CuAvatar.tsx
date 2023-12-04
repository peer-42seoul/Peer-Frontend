import { Avatar, AvatarProps } from '@mui/material'

const CuAvatar = (props: AvatarProps) => {
  return (
    <Avatar {...props} sx={{ bgcolor: '#FFFFFF' }}>
      {props.children ? props.children : <></>}
    </Avatar>
  )
}

export default CuAvatar
