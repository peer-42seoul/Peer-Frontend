import { Stack } from '@mui/material'
import Image from 'next/image'

const DolphinSpin = () => {
  return (
    <Image
      src={'/images/dolphin_spin.gif'}
      alt="dolphin_spin"
      width={500}
      height={500}
    />
  )
}

const Loading = () => {
  return (
    <Stack>
      <DolphinSpin />
    </Stack>
  )
}

export default Loading
