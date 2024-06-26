'use client'

import { useMediaQuery, IconButton, Box } from '@mui/material'
import useModal from '@/hook/useModal'
import SearchBody from '../../search/panel/SearchBody'
import { SearchIcon } from '@/icons'
import Header from '@/app/panel/layout-panel/Header'
import dynamic from 'next/dynamic'

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

const DynamicModal = dynamic(() => import('@mui/material/Modal'), {
  loading: () => <></>,
})

const SearchPc = () => {
  const { isOpen, openModal, closeModal } = useModal()
  return (
    <>
      <IconButton color="inherit" aria-label="menu" onClick={openModal}>
        <SearchIcon sx={{ color: 'text.alternative' }} />
      </IconButton>
      {/* NOTE : 기본 모달과 형태가 달라 CuModal을 사용하지 않았습니다. */}
      <DynamicModal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={StylePcSearch}>
          <SearchBody onClose={closeModal} />
        </Box>
      </DynamicModal>
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
      <DynamicModal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={StyleMobileSearch}>
          <Header backAction={closeModal} />
          <SearchBody onClose={closeModal} />
        </Box>
      </DynamicModal>
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
