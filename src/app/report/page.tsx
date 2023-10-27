import React from 'react'
import ReportForm from './panel/ReportForm'
import { Typography, Container } from '@mui/material'

const Report = () => {
  return (
    <Container sx={{ width: '100%', padding: '20px'}}>
      <Typography>신고하기 페이지</Typography>
      <ReportForm />
    </Container>
  )
}

export default Report
