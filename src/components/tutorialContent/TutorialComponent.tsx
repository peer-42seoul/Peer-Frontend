import { Stack, Typography } from '@mui/material'
import useMedia from '@/hook/useMedia'

interface childrenProps {
  children: React.ReactNode
}

interface textProps {
  text: string
}

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

export const TitleContianer = ({ children }: childrenProps) => {
  return <Stack width={'100%'}>{children}</Stack>
}

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

export const Content = ({ text }: textProps) => {
  const { isPc } = useMedia()
  return (
    <Typography variant={isPc ? 'Body1' : 'Caption'} color={'text.normal'}>
      {text}
    </Typography>
  )
}
