'use client'

import { useMediaQuery, IconButton, Box } from '@mui/material'
import { Search } from '@mui/icons-material'
import useModal from '@/hook/useModal'

const SearchPc = () => {
  const { isOpen, ModalCustom, openModal, closeModal } = useModal()
  return (
    <IconButton color="inherit" aria-label="menu" onClick={openModal}>
      <Search />
      {isOpen && (
        <ModalCustom>
          <Box sx={{ backgroundColor: 'red' }}>
            <h2>A Title</h2>
            <p>Some content...</p>
            <button onClick={closeModal}>Close</button>
          </Box>
        </ModalCustom>
      )}
    </IconButton>
  )
}

const SearchMobile = () => {
  const { isOpen, ModalCustom, openModal, closeModal } = useModal()
  return (
    <IconButton color="inherit" aria-label="menu" onClick={openModal}>
      <Search />
      {isOpen && (
        <ModalCustom>
          <Box sx={{ backgroundColor: 'yellow' }}>
            <h2>A Title</h2>
            <p>Some content...</p>
            <button onClick={closeModal}>Close</button>
          </Box>
        </ModalCustom>
      )}
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
