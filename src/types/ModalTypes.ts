import { ModalProps } from '@mui/material'

/**
 * IModalButton
 * @param text 버튼에 표시될 텍스트입니다.
 * @param onClick 버튼을 클릭했을 때 실행될 함수입니다.
 * @param type 버튼의 타입입니다. (기본값: 'button')
 * @param form 버튼이 속한 폼의 id입니다.
 * @param isLoading 버튼이 로딩 중인지 여부입니다. (기본값: false)
 */

export interface IModalButton {
  text: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  form?: string
  isLoading?: boolean
}

/**
 * confirm 모달처럼 텍스트만 보여주는 모달이라면 CuTextModal을 사용할 수 있습니다.
 *
 * 기본적으로 MUI Modal에서 쓰이는 props를 모두 사용할 수 있습니다.
 * https://mui.com/material-ui/api/modal/
 * @param open Modal의 열림 여부입니다. (필수)
 *
 * (디자인 적용을 위해 추가된 props)
 * @param title Modal의 제목입니다. (필수)
 * @param onClose Modal의 닫기 함수입니다. (필수)
 * @param containedButton (IModalButton) Modal의 주 버튼입니다. (선택)
 * @param textButton (IModalButton) Modal의 보조 버튼입니다. (선택)
 * @param mobileFullSize 모바일에서 모달이 전체 화면을 차지하도록 합니다. (기본값: false)
 */

export interface ICuModalProps extends Omit<ModalProps, 'onClose'> {
  title: string
  containedButton?: IModalButton
  textButton?: IModalButton
  mobileFullSize?: boolean // 기본적으로 false입니다.
  onClose: () => void
}
