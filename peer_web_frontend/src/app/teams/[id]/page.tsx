'use client'

import { Stack } from '@mui/material'
import useMedia from '@/hook/useMedia'

const TeamsSetupPage = ({ params }: { params: { id: string } }) => {
  const { isPc } = useMedia()
  const { id } = params

  return (
    <Stack
      margin={4}
      spacing={2}
      direction={isPc ? 'row' : 'column'}
      flex={4}
      border="1px solid"
      borderRadius={2}
      padding={2}
    >
      팀 페이지
    </Stack>
  )
}

export default TeamsSetupPage
