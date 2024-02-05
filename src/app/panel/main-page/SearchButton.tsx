'use client'

import { useMediaQuery, IconButton, Modal, Box } from '@mui/material'
import useModal from '@/hook/useModal'
import SearchBody from '../../search/panel/SearchBody'
import { SearchIcon } from '@/icons'

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
        <SearchIcon sx={{ color: 'text.alternative' }} />
      </IconButton>
      {/* NOTE : 기본 모달과 형태가 달라 CuModal을 사용하지 않았습니다. */}
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={StylePcSearch}>
          <SearchBody onClose={closeModal} />
        </Box>
      </Modal>
    </>
  )
}

const SearchMobile = () => {
  const { isOpen, openModal, closeModal } = useModal()
  return (
    <>
      <IconButton color="inherit" aria-label="menu" onClick={openModal}>
        <SearchIcon sx={{ color: 'text.normal' }} />
      </IconButton>
      {/* NOTE : 기본 모달과 형태가 달라 CuModal을 사용하지 않았습니다. */}
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={StyleMobileSearch}>
          <SearchBody onClose={closeModal} />
        </Box>
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
