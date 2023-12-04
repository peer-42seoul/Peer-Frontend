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
    <Stack sx={style.PcBox}>
      <Stack direction={'row'} justifyContent={'flex-end'} spacing={'2rem'}>
        <CuButton
          message={'이 쪽지 나가기'}
          variant="text"
          action={() => router.push('/my-page/message')}
          style={style.PcGoToListButton}
        />
      </Stack>
      <Stack sx={style.PcMessageContainer} spacing={'3rem'}>
        {children}
      </Stack>
    </Stack>
  ) : (
    <Box>{children}</Box>
  )
}

export default MessageContainer
