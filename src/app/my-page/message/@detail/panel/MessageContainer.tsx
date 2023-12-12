import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Modal, Stack, IconButton, Typography, Box } from '@mui/material'
import CuButton from '@/components/CuButton'
import * as modalStyle from '@/components/CuModal.style'
import useMedia from '@/hook/useMedia'
import ChevronLeft from '@/icons/ChevronLeft'
import useMessagePageState from '@/states/useMessagePageState'
import * as style from './MessageContainer.style'

const MessageContainer = ({
  targetNickname,
  children,
}: {
  targetNickname: string
  children: ReactNode
}) => {
  const { isPc } = useMedia()
  const router = useRouter()
  const { setListPage } = useMessagePageState()

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
    <Modal open={true} onClose={setListPage} keepMounted>
      <Stack spacing={'1.5rem'} sx={modalStyle.mobileFullSizeWrapper}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          spacing={'1rem'}
        >
          <IconButton onClick={setListPage}>
            <ChevronLeft />
          </IconButton>
          <Stack direction={'row'} spacing={'0.62rem'}>
            <Typography variant={'Body2Emphasis'} color={'text.normal'}>
              {targetNickname}
            </Typography>
            <Typography variant={'Body2'} color={'text.alternative'}>
              님과의 쪽지
            </Typography>
          </Stack>
          <Box sx={modalStyle.headerDummyButton}></Box>
        </Stack>
        {children}
      </Stack>
    </Modal>
  )
}

export default MessageContainer
