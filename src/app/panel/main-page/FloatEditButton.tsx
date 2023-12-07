import { Fab, Stack } from '@mui/material'
import Link from 'next/link'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import useAuthStore from '@/states/useAuthStore'

const FloatEditButton = () => {
  const { isLogin } = useAuthStore()

  return (
    <Fab color="primary" aria-label="edit" size={'medium'}>
      <Link
        style={{ width: '100%', height: '100%' }}
        href={isLogin ? '/recruit/write' : '/login?redirect=/recruit/write'}
      >
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          width="100%"
          height={'100%'}
        >
          <ModeOutlinedIcon sx={{ color: 'white' }} />
        </Stack>
      </Link>
    </Fab>
  )
}

export default FloatEditButton
