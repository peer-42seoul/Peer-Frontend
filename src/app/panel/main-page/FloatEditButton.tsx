import useAuthStore from '@/states/useAuthStore'
import { Edit } from '@mui/icons-material'
import { Fab } from '@mui/material'
import Link from 'next/link'

const FloatEditButton = () => {
  const { isLogin } = useAuthStore()

  return (
    <Fab color="secondary" aria-label="edit">
      <Link
        href={isLogin ? '/recruit/write' : '/login?redirect=/recruit/write'}
      >
        <Edit />
      </Link>
    </Fab>
  )
}

export default FloatEditButton
