import { Checkbox, FormControlLabel, Paper, Typography } from '@mui/material'

const Privacy = () => {
  return (
    <>
      <Typography>개인정보처리방침</Typography>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="전체 동의하기"
      />
      <Typography>
        실명 인증된 아이디로 가입,이벤트 혜택 정보 수신(선택) 동의를 포함합니다.
      </Typography>
      <FormControlLabel control={<Checkbox />} label="[필수] peer 이용 약관" />
      <Paper sx={{ width: '450px', height: '100px' }}></Paper>
      <FormControlLabel
        control={<Checkbox />}
        label="[필수] 개인정보 수집 및 이용"
      />
      <Paper sx={{ width: '450px', height: '100px' }}></Paper>
    </>
  )
}

export default Privacy
