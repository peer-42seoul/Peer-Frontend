import { AppBar, Typography, Toolbar, Button } from '@mui/material'
import BackButton from '../../component/BackButton'

export default function SearchHeader() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <BackButton />
        <Typography>검색</Typography>
        <Button disabled />
      </Toolbar>
    </AppBar>
  )
}
