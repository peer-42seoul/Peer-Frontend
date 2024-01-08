import { useState } from 'react'
import { Typography, Stack, Button, CardActions } from '@mui/material'
import { SizeType } from '@/types/ITeamDnDLayout'
import WidgetCard from './WidgetCard'
import TextEditModal from './TextEditModal'
import useModal from '@/hook/useModal'
import TextIcon from '@/icons/TextIcon'

/* 임시 위젯 */
const TextWidget = ({ data, size }: { data: any; size: SizeType }) => {
  const sizeHeight = { S: '5.75rem', M: '5.75rem', L: '20rem' }

  const { isOpen, openModal, closeModal } = useModal()
  const [text, setText] = useState(data)

  const handleOpenModal = () => {
    openModal()
  }
  return (
    <>
      <WidgetCard contentSx={{ padding: '1.5rem 1.5rem 2rem 1.5rem' }}>
        <Stack height="100%" gap="1.5rem">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="Title3Emphasis"
              color="text.normal"
              sx={{ display: 'flex', alightItems: 'center', gap: '0.25rem' }}
            >
              <TextIcon sx={{ color: 'text.normal' }} /> 텍스트박스
            </Typography>
            <CardActions sx={{ padding: '0' }}>
              <Button onClick={handleOpenModal}>
                <Typography variant="CaptionEmphasis" color="text.alternative">
                  수정
                </Typography>
              </Button>
            </CardActions>
          </Stack>
          {text ? (
            <Typography
              width="100%"
              height={sizeHeight[size]}
              variant="Body1"
              sx={{ overflowWrap: 'break-word', overflowY: 'scroll' }}
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
