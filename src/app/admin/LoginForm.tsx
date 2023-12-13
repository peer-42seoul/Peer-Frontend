import React from 'react'
import { Button, TextField, Grid, Paper, Typography } from '@mui/material'

const LoginForm = () => {
  return (
    <Grid container component={Paper} elevation={2} padding={2}>
      <Grid item xs={12}>
        <Typography variant="h5">관리자</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="아이디"
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="비밀번호"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" fullWidth>
          로그인
        </Button>
      </Grid>
    </Grid>
  )
}
export default LoginForm
