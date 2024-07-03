import * as style from '@/components/NavBarLayout.style'
import { Box, Container } from '@mui/material'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Container sx={style.container}>
    <Box sx={style.fullPageContentBox}>{children}</Box>
  </Container>
)

export default Layout
