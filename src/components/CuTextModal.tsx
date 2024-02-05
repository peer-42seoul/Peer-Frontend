import React from 'react'
import { Typography } from '@mui/material'
import { ICuModalProps } from '@/types/ModalTypes'
import CuModal from './CuModal'

interface ICuTextModal extends Omit<ICuModalProps, 'children'> {
  content: string
  children?: never // children은 사용하지 않습니다.
}

/**
 * 기본적으로 MUI Modal에서 쓰이는 props를 모두 사용할 수 있습니다.
 * https://mui.com/material-ui/api/modal/
 *
 * @param open Modal의 열림 여부입니다. (필수)
 *
 * (CuModal에서 추가된 props)
 * @param title Modal의 제목입니다. (필수)
 * @param onClose Modal의 닫기 함수입니다. (필수)
 * @param containedButton (IModalButton) Modal의 주 버튼입니다. (필수)
 * @param textButton (IModalButton) Modal의 보조 버튼입니다. (선택)
 * @param mobileFullSize 모바일에서 모달이 전체 화면을 차지하도록 합니다. (기본값: false)
 *
 * (CuTextModal에서 추가된 props)
 * @param content Modal의 내용입니다. (필수)
 */

const CuTextModal = ({
  title,
  containedButton,
  textButton,
  open,
  onClose,
  sx,
  keepMounted,
  content,
}: ICuTextModal) => {
  return (
    <CuModal
      title={title}
      containedButton={containedButton}
      textButton={textButton}
      open={open}
      onClose={onClose}
      sx={sx}
      keepMounted={!!keepMounted}
    >
      <Typography variant="Body1" color="text.normal" textAlign={'center'}>
        {content}
      </Typography>
    </CuModal>
  )
}

export default CuTextModal
