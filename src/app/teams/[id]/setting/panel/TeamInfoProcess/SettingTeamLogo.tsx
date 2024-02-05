import { Avatar, Box, Button, IconButton, Stack } from '@mui/material'
import * as styles from '../styles'
import CuTextModal from '@/components/CuTextModal'
import useModal from '@/hook/useModal'
import { UseFormSetValue } from 'react-hook-form'
import { ISetupTeam } from '../SettingTeamInfo'
import { ChangeEvent, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear'

interface ISettingTeamLogo {
  teamLogoImage: string
  setValue: UseFormSetValue<ISetupTeam>
}

const SettingTeamLogo = ({ teamLogoImage, setValue }: ISettingTeamLogo) => {
  const { isOpen, openModal, closeModal } = useModal()
  const [preview, setPreview] = useState<string>(
    teamLogoImage.length !== 0 ? teamLogoImage : '/images/teamLogo.png',
  )

  const deleteImage = () => {
    setPreview('/images/teamLogo.png')
    setValue('teamImage', '')
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
      }
      reader.readAsDataURL(file!)
    }
  }

  return (
    <>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'0.5rem'}
        p={'0.5rem'}
      >
        <Box
          width={['100%', '10rem']}
          height={['100%', '10rem']}
          sx={{ position: 'relative' }}
        >
          <IconButton sx={styles.closeButtonStyle} onClick={openModal}>
            <ClearIcon />
          </IconButton>
          <Button
            component="label"
            sx={{ position: 'relative', width: '100%', height: '100%' }}
          >
            <Avatar
              variant="rounded"
              src={preview}
              alt="teamLogo"
              sx={{ width: '10rem', height: '10rem' }}
            />
            <input
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
