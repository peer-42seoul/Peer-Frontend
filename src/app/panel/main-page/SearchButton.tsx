'use client'

import { useMediaQuery, IconButton, Modal } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import useModal from '@/hook/useModal'
import SearchBody from '../../search/panel/SearchBody'

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

      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={StylePcSearch}
      >
        <SearchBody onClose={closeModal} />
      </Modal>
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

      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={StyleMobileSearch}
      >
        <SearchBody onClose={closeModal} />
      </Modal>
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
