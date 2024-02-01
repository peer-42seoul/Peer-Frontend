import { Stack, Typography } from '@mui/material'
import useMedia from '@/hook/useMedia'

interface childrenProps {
  children: React.ReactNode
}

interface textProps {
  text: string
}

// 튜토리얼 컨텐츠의 최상위 컨테이너
export const TutorialContainer = ({ children }: childrenProps) => {
  return (
    <Stack
      width={'100%'}
      height={'100%'}
      alignItems={'center'}
      spacing={'0.5rem'}
    >
      {children}
    </Stack>
  )
}

// 제목 - 내용을 감싸는 컨테이너
export const TitleContianer = ({ children }: childrenProps) => {
  return <Stack width={'100%'}>{children}</Stack>
}

// 제목 typography
export const SubTitle = ({ text }: textProps) => {
  const { isPc } = useMedia()
  return (
    <Typography
      variant={isPc ? 'Title3Emphasis' : 'Body2Emphasis'}
      color={'text.normal'}
    >
      {text}
    </Typography>
  )
}

// 내용 typography
export const Content = ({ text }: textProps) => {
  const { isPc } = useMedia()
  return (
    <Typography variant={isPc ? 'Body1' : 'Caption'} color={'text.normal'}>
      {text}
    </Typography>
  )
}
