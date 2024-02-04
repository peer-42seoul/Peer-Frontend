import { Fab, Stack } from '@mui/material'
import Link from 'next/link'
import useAuthStore from '@/states/useAuthStore'
import WriteIcon from '@/icons/Nav/WriteIcon'

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
          height="100%"
        >
          <WriteIcon
            sx={{
              color: 'text.normal',
            }}
          />
        </Stack>
      </Link>
    </Fab>
  )
}

export default FloatEditButton
