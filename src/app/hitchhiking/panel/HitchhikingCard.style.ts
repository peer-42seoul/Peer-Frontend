import { SxProps } from '@mui/material'

const cardStyle: SxProps = {
  backgroundColor: 'background.primary',
  width: ['90vw', '20.5rem'], // xs이 모바일, sm이 pc이므로 가능한 방식입니다.
  height: '27rem',
  maxWidth: '20.5rem',
  borderRadius: '0.75rem',
  borderWidth: '2px',
  borderColor: 'line.base',
  borderStyle: 'solid',
  position: 'absolute',
  top: '50%',
  left: '50%',
}

export { cardStyle }
