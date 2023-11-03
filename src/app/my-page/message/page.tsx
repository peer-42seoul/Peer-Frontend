'use client'

import useSWR from 'swr'
import { Box, Container } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import CuButton from '@/components/CuButton'
import useMedia from '@/hook/useMedia'
import useModal from '@/hook/useModal'
import { IMessagObject } from '@/types/IMessageInformation'
import MessageContainer from './panel/MessageContainer'

const MessageMain = () => {
  // NOTE : useRef가 필요한 이유? - 필요없음이 확인되면 지우기
  // const MessageBox = useRef<HTMLDivElement | null>(null)
  const { isPc } = useMedia()
  const { isOpen, openModal, closeModal } = useModal()
  const axiosWithAuth = useAxiosWithAuth()
  const { data, error, isLoading } = useSWR<IMessagObject[]>(
    '/api/v1/message/list',
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )

  return (
    <Container sx={{ height: '90vh' }}>
      <Box sx={{ width: '100%' }}>
        <CuButton
          variant="outlined"
          action={() => openModal()}
          message="새 쪽지 보내기"
          style={{ marginBottom: '32px' }}
        />
        {/* <Box sx={{ height: '85vh', overflow: 'auto' }} ref={MessageBox}> */}
        <MessageContainer
          messages={data || []}
          error={error}
          isLoading={isLoading}
          isPC={isPc}
          isNewMessageModalOpen={isOpen}
          newMessageModalClose={closeModal}
        />
        {/* </Box> */}
      </Box>
    </Container>
  )
}

export default MessageMain
