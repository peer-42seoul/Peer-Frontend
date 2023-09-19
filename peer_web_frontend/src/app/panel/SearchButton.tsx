'use client'

import { useMediaQuery, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import useModal from '@/hook/useModal'

const SearchPc = () => {
  const { isOpen, ModalCustom, openModal, closeModal } = useModal()
  return (
    <IconButton color="inherit" aria-label="menu" onClick={openModal}>
      <Search />
      {isOpen && (
        <ModalCustom>
          <div>
            <h2>A Title</h2>
            <p>Some content...</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </ModalCustom>
      )}
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
