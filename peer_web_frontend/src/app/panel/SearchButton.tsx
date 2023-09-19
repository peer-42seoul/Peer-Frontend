'use client'

import { useMediaQuery, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

const SearchPc = () => {
  return (
    <IconButton color="inherit" aria-label="menu">
      <Search />
    </IconButton>
  )
}

const SearchMobile = () => {
  const router = useRouter()
  return (
    <IconButton
      color="inherit"
      aria-label="menu"
      onClick={() => router.push('/search')}
    >
      <Search />
    </IconButton>
  )
}

const SearchButton = () => {
  const isPc = useMediaQuery('(min-width:480px)')
  return (
    <>
      {isPc && <SearchPc />}
      {!isPc && <SearchMobile />}
    </>
  )
}

export default SearchButton
