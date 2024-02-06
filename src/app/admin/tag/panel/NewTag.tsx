'use client'

import CuModal from '@/components/CuModal'
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'

interface props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  writeMode: React.MutableRefObject<string>
  tagName: string
  setTagName: React.Dispatch<React.SetStateAction<string>>
  tagColor: string
  setTagColor: React.Dispatch<React.SetStateAction<string>>
  onHandleSubmit: () => void
  style: any
}

const NewTag = ({
  open,
  setOpen,
  writeMode,
  tagName,
  setTagName,
  tagColor,
  setTagColor,
  onHandleSubmit,
  style,
}: props) => {
  const [tagNameError, setTagNameError] = useState('')

  const validateTagName = (name: string) => {
    if (!name.trim()) {
      setTagNameError('태그 이름은 비워둘 수 없습니다.')
      return false
    } else if (name.length > 10) {
      setTagNameError('태그 이름은 10자를 초과할 수 없습니다.')
      return false
    }
    setTagNameError('')
    return true
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setTagName(name)
    validateTagName(name)
  }

  // 색상 유효성 검사
  const [colorError, setColorError] = useState('')

  const validateColor = (tagColor: string) => {
    const hexColorRegex = /^#([0-9A-F]{3}){2}$/i
    return hexColorRegex.test(tagColor)
  }

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setTagColor(color)

    if (validateColor(color) || color === '') {
      setColorError('')
    } else {
      setColorError('유효하지 않은 색상 코드입니다. 예: #A333D2')
    }
  }

  return (
    <CuModal
      title={
        writeMode.current === 'write' ? '새 태그 추가하기' : '태그 수정하기'
      }
      open={open}
      onClose={() => setOpen(false)}
    >
      <Container>
        {/* <Typography variant={'h4'} align="center">
          {writeMode.current === 'write' ? '새 태그 추가하기' : '태그 수정하기'}
        </Typography> */}
        <Typography variant={'Body1'} align="center">
          태그 이름
        </Typography>
        <TextField
          value={tagName}
          error={!!tagNameError}
          helperText={tagNameError}
          sx={{ display: 'flex', justifyContent: 'center' }}
          // onChange={(e) => setTagName(e.target.value)}
          onChange={handleNameChange}
        />
        <Typography variant={'Body1'} align="center">
          태그 색상
        </Typography>
        <TextField
          value={tagColor}
          error={!!colorError}
          helperText={colorError}
          sx={{ display: 'flex', justifyContent: 'center' }}
          onChange={handleColorChange}
        />
        <Box  sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
          <Stack direction={'row'} justifyContent={'flex-end'} alignItems={'flex-end'}>
            <Button variant={'contained'} onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button
              variant={'contained'}
              onClick={() => onHandleSubmit()}
              disabled={colorError !== '' || tagNameError !== ''}
            >
              등록
            </Button>
          </Stack>
        </Box>
      </Container>
    </CuModal>
  )
}

export default NewTag
