import { NavigateBefore } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/navigation'

const BackIconButton = () => {
  const router = useRouter()
  return (
    <IconButton
      sx={{ width: '40px', height: '40px' }}
      onClick={() => router.back()}
    >
      <NavigateBefore />
    </IconButton>
  )
}

export default BackIconButton
