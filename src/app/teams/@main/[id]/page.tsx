'use client'

import { Typography } from '@mui/material'

const TeamsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params

  return (
    <>
      <Typography>팀 페이지</Typography>
      <Typography>{id}</Typography>
    </>
  )
}

export default TeamsPage
