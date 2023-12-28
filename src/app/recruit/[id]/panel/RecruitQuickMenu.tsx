import { IconButton, Stack } from '@mui/material'
import FavoriteButton from '@/components/FavoriteButton'
import React from 'react'
import SharingIcon from '@/app/recruit/[id]/panel/SharingIcon'
import SirenIcon from '@/app/recruit/[id]/panel/SirenIcon'
import ReportModal from '@/components/ReportModal'
import useModal from '@/hook/useModal'

const RecruitQuickMenu = ({
  favorite,
  recruit_id,
}: {
  favorite: boolean | undefined
  recruit_id: number
}) => {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      <Stack alignItems={'center'}>
        <FavoriteButton recruit_id={recruit_id} favorite={favorite} />
        <IconButton onClick={() => {}}>
          <SharingIcon />
        </IconButton>
        <IconButton onClick={openModal}>
          <SirenIcon />
        </IconButton>
      </Stack>
      <ReportModal
        isModalOpen={isOpen}
        handleClose={closeModal}
        reportType={'recruit'}
        targetId={recruit_id.toString()}
      />
    </>
  )
}

export default RecruitQuickMenu
