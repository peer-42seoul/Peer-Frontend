'use client'

import { useMediaQuery, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import useModal from '@/hook/useModal'
import CuModal from '@/components/CuModal'
import SearchBody from '../search/panel/SearchBody'

const StyleMobileSearch = {
  position: 'absolute' as 'absolute',
  top: '0%',
  width: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
}

const StylePcSearch = {
  position: 'absolute' as 'absolute',
  top: '0%',
  width: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
}

const SearchPc = () => {
  const { isOpen, openModal, closeModal } = useModal()
  return (
    <>
      <IconButton color="inherit" aria-label="menu" onClick={openModal}>
        <SearchIcon color="primary" />
      </IconButton>

      <CuModal
        open={isOpen}
        handleClose={closeModal}
        ariaTitle="modal-title"
        ariaDescription="modal-description"
        style={StylePcSearch}
      >
        <SearchBody onClose={closeModal} />
      </CuModal>
    </>
  )
}

const SearchMobile = () => {
  const { isOpen, openModal, closeModal } = useModal()
  return (
    <>
      <IconButton color="inherit" aria-label="menu" onClick={openModal}>
        <SearchIcon />
      </IconButton>

      <CuModal
        open={isOpen}
        handleClose={closeModal}
        ariaTitle="modal-title"
        ariaDescription="modal-description"
        style={StyleMobileSearch}
      >
        <SearchBody onClose={closeModal} />
      </CuModal>
    </>
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
