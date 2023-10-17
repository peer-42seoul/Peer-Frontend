'use client'

import { Stack, Typography } from '@mui/material'
import useMedia from '@/hook/useMedia'

const TeamsPage = ({ params }: { params: { id: string } }) => {
  const { isPc } = useMedia()
  const { id } = params

  return (
    <>
      <Typography>팀 페이지</Typography>
      <Typography>{id}</Typography>
    </>
  )
}

export default TeamsPage
