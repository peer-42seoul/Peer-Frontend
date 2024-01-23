// 게시판과 공지사항 미리보기 모달을 함께 쓸 계획...

import CuButton from '@/components/CuButton'
import CuModal from '@/components/CuModal'
import { ListItem } from '@/components/board/ListPanel'
import { ITeamNotice } from '@/types/TeamBoardTypes'
import { Stack } from '@mui/material'
import { useRouter } from 'next/navigation'

interface IPreviewModalProps {
  open: boolean
  onClose: () => void
  data: ITeamNotice[]
  teamId?: string | string[]
}

const PreviewModal = ({ open, onClose, data, teamId }: IPreviewModalProps) => {
  const router = useRouter()

  return (
    <CuModal open={open} onClose={onClose} title={'공지사항'}>
      <Stack spacing={'1rem'}>
        <>
          {data.map((item) => (
            <ListItem
              key={crypto.randomUUID()}
              title={item.title}
              authorNickname={item.authorNickname}
              createdAt={item.createdAt}
            />
          ))}
        </>
        <CuButton
          action={() => router.push(`/teams/${teamId}/board`)}
          message={'모든 공지사항 보기'}
          variant={'text'}
        />
      </Stack>
    </CuModal>
  )
}

export default PreviewModal
