import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import { Search, NotificationsNoneOutlined } from '@mui/icons-material';
const Header = () => {
  return (<Box sx={{ flex: 1, }}>
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          aria-label="menu"
        >
          <NotificationsNoneOutlined />
        </IconButton>
        <Typography component="div">
          로고
        </Typography>
        <IconButton
          color="inherit"
          aria-label="menu"
        ><Search />        
        </IconButton>
      </Toolbar>
    </AppBar>
  </Box>)
}

export default Header;