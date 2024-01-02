import { useState } from 'react'
import { Typography, Stack, Button, CardActions } from '@mui/material'
import { SizeType } from '@/types/ITeamDnDLayout'
import WidgetCard from './WidgetCard'
import TextEditModal from './TextEditModal'
import useModal from '@/hook/useModal'

/* 임시 위젯 */
const TextWidget = ({ data, size }: { data: any; size: SizeType }) => {
  const sizeHeight = { S: '5.75rem', M: '5.75rem', L: '20rem' }

  const { isOpen, openModal, closeModal } = useModal()
  const [text, setText] = useState(data)

  const handleOpenModal = (e: any) => {
    console.log(e)
    e.stopPropagation()
    openModal()
  }
  return (
    <>
      <WidgetCard bgcolor={'pink'}>
        <Stack height="100%" gap="1.5rem">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="Title3Emphasis" color="text.normal">
              {'Text ' + size}
            </Typography>
            <CardActions>
              <Button onClick={handleOpenModal}>
                <Typography variant="CaptionEmphasis" color="text.alternative">
                  수정
                </Typography>
              </Button>
            </CardActions>
          </Stack>
          {text ? (
            <Typography
              height={sizeHeight[size]}
              variant="Body1"
              overflow="scroll"
            >
              {text}
            </Typography>
          ) : (
            <Typography variant="Body1" color="text.alternative">
              등록된 글이 없습니다.
            </Typography>
          )}
        </Stack>
      </WidgetCard>
      <TextEditModal
        open={isOpen}
        handleClose={closeModal}
        data={text}
        setData={setText}
      />
    </>
  )
}
export default TextWidget
