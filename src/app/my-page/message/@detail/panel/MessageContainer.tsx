import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Stack } from '@mui/material'
import CuButton from '@/components/CuButton'
import useMedia from '@/hook/useMedia'
import * as style from './MessageContainer.style'

const MessageContainer = ({ children }: { children: ReactNode }) => {
  const { isPc } = useMedia()
  const router = useRouter()
  return isPc ? (
    <Stack spacing={'1rem'} sx={style.pcBox}>
      <Stack direction={'row'} justifyContent={'flex-end'} spacing={'2rem'}>
        <CuButton
          message={'이 쪽지 나가기'}
          variant="text"
          action={() => router.push('/my-page/message')}
          style={style.pcGoToListButton}
        />
      </Stack>
      <Stack sx={style.pcMessageContainer} spacing={'3rem'}>
        {children}
      </Stack>
    </Stack>
  ) : (
    <Box>{children}</Box>
  )
}

export default MessageContainer
