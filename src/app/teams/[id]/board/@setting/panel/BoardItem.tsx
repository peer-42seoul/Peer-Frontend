import useAxiosWithAuth from '@/api/config'
import { ITeamBoard } from '@/types/TeamBoardTypes'
import { IconButton, Stack, Typography } from '@mui/material'
import { TrashLineIcon } from '@/icons'
import useModal from '@/hook/useModal'
import useToast from '@/states/useToast'
import CuTextModal from '@/components/CuTextModal'

const BoardItem = ({ board }: { board: ITeamBoard }) => {
  const axiosWithAuth = useAxiosWithAuth()
  const { isOpen, closeModal, openModal } = useModal()
  const { openToast } = useToast()
  const handleDeleteBoard = (boardId: number) => {
    axiosWithAuth
      .delete(`/api/v1/team/board/${boardId}`)
      .then(() => {
        alert('게시판을 삭제했습니다.')
      })
      .catch(() => {
        openToast({
          severity: 'error',
          message: '게시판을 삭제하지 못했습니다.',
        })
      })
  }
  return (
    <>
      <Stack direction={'row'} spacing={'0.5rem'} alignItems={'center'}>
        <Typography
          variant={'Body2'}
          color={'text.alternative'}
          sx={{ flexGrow: 1 }}
        >
          {board.boardName}
        </Typography>
        <IconButton
          sx={{ width: '2.5rem', height: '2.5rem' }}
          onClick={openModal}
        >
          <TrashLineIcon
            height={'1.25rem'}
            width={'1.25rem'}
            sx={{ color: 'text.alternative' }}
          />
        </IconButton>
      </Stack>
      <CuTextModal
        open={isOpen}
        onClose={closeModal}
        title={'삭제하시겠어요?'}
        content={'삭제를 누르면 게시판 내 모든 글이 사라져요.'}
        containedButton={{
          text: '삭제',
          onClick: () => {
            closeModal()
            handleDeleteBoard(board.boardId)
          },
        }}
        textButton={{
          text: '취소',
          onClick: closeModal,
        }}
      />
    </>
  )
}

export default BoardItem
