import { Container, SxProps, Theme } from '@mui/material'
import useMedia from '@/hook/useMedia'
import * as style from './BackgroundBox.style'

interface IBackgroundBoxProps {
  pcSx?: SxProps<Theme>
  mobileSx?: SxProps<Theme>
  children: React.ReactNode
}

/**
 * @description 자주 사용되는 박스형태 컴포넌트의 pc, 모바일 기본 디자인을 정의한 컴포넌트입니다.
 *  - borderRadius
 *  - backgroundColor
 * @param children - children
 * @param pcSx - (선택) 기본 pc style에 추가해서 적용할 style
 * @param mobileSx - (선택) 기본 mobile style에 추가해서 적용할 style
 */

const BackgroundBox = ({ children, mobileSx, pcSx }: IBackgroundBoxProps) => {
  const { isPc } = useMedia()
  return (
    <Container
      disableGutters
      sx={{
        ...(isPc ? style.pcBox : style.mobileBox),
        ...(isPc ? pcSx : mobileSx),
      }}
    >
      {children}
    </Container>
  )
}
export default BackgroundBox
