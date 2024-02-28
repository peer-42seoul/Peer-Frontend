import { Avatar, Box, Button, IconButton, Stack } from '@mui/material'
import * as styles from '../styles'
import CuTextModal from '@/components/CuTextModal'
import useModal from '@/hook/useModal'
import { UseFormSetValue } from 'react-hook-form'
import { ISetupTeam } from '../SettingTeamInfo'
import { ChangeEvent, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import { TeamStatus } from '@/app/teams/types/types'

interface ISettingTeamLogo {
  teamStatus: TeamStatus
  teamLogoImage: string
  setValue: UseFormSetValue<ISetupTeam>
  setIsLogoEdit: (isLogoEdit: boolean) => void
}

const SettingTeamLogo = ({
  teamStatus,
  teamLogoImage,
  setValue,
  setIsLogoEdit,
}: ISettingTeamLogo) => {
  const { isOpen, openModal, closeModal } = useModal()
  const [preview, setPreview] = useState<string>(
    teamLogoImage.length !== 0 ? teamLogoImage : '',
  )

  const deleteImage = () => {
    setPreview('')
    setValue('teamImage', null)
    setIsLogoEdit(true)
    closeModal()
  }

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        setPreview(reader.result as string)
        setValue('teamImage', reader.result as string)
        setIsLogoEdit(true)
      }
      reader.readAsDataURL(file!)
    }
  }

  return (
    <>
      <Stack direction={'row'} alignItems={'center'} spacing={'0.5rem'}>
        <Box
          width={['100%', '10rem']}
          height={['100%', '10rem']}
          sx={{ position: 'relative' }}
        >
          <IconButton
            sx={styles.closeButtonStyle}
            disabled={teamStatus === TeamStatus.COMPLETE}
            onClick={openModal}
          >
            <ClearIcon />
          </IconButton>
          <Button
            disabled={teamStatus === TeamStatus.COMPLETE}
            component="label"
            sx={{ position: 'relative', width: '100%', height: '100%' }}
          >
            <Avatar
              variant="rounded"
              src={preview}
              alt="teamLogo"
              sx={{ width: '8rem', height: '8rem' }}
            />
            <input
              disabled={teamStatus === TeamStatus.COMPLETE}
              type="file"
              accept={'image/*'}
              style={{ display: 'none' }}
              id="teamImage"
              onChange={handleImage}
            />
          </Button>
        </Box>
      </Stack>

      <CuTextModal
        open={isOpen}
        onClose={closeModal}
        title={'팀 로고 삭제'}
        content={'로고을 삭제하시겠습니까?'}
        containedButton={{
          text: '삭제',
          onClick: deleteImage,
        }}
        textButton={{
          text: '취소',
          onClick: closeModal,
        }}
      />
    </>
  )
}

export default SettingTeamLogo
