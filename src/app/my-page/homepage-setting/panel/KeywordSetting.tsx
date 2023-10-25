'use client'
import BackButton from '@/components/BackButton'
import CuButton from '@/components/CuButton'
import CuModal from '@/components/CuModal'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import useMedia from '@/hook/useMedia'
import useModal from '@/hook/useModal'
import { AlertColor, Box, Button, Chip, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import useSWR from 'swr'

interface IChip {
  key: number
  label: string
}

interface IToastProps {
  severity: AlertColor | undefined
  message: string
}

const mobileModalStyle = {
  width: '100vmax',
  height: '100vmax',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
}

const KeywordAddingField = ({
  mutate,
  isPc,
  setToastMessage,
}: {
  mutate: () => void
  isPc: boolean
  setToastMessage: (message: IToastProps) => void
}) => {
  const [inputValue, setInputValue] = useState<string>('' as string)
  const textFieldRef = useRef<HTMLInputElement | null>(null)

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const trimmed = inputValue.trim()
      if (trimmed.length < 2) {
        setToastMessage({
          severity: 'error',
          message:
            '알림 키워드는 양 끝 공백은 제외 최소 2자 이상이어야 합니다.',
        })
        return
      }
      await axios
        .post(`http://localhost:4000/alarmAdd`, { newKeyword: trimmed })
        .then(() => {
          setToastMessage({
            severity: 'success',
            message: `'${trimmed}'를 알림 키워드 목록에 추가하였습니다.`,
          })
          mutate()
        })
        .catch((error) => {
          console.log(error)
          setToastMessage({
            severity: 'error',
            message: `'${trimmed}'를 알림 키워드 목록에 추가하지 못했습니다.`,
          })
        })
      console.log(inputValue)
      setInputValue('' as string)
    }
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value) // 입력 값이 변경될 때 상태 업데이트
  }

  return (
    <Box>
      <CuTextFieldLabel style={{ margin: '8px 0px' }} htmlFor="keyword-field">
        {isPc ? '키워드 관리' : '키워드'}
      </CuTextFieldLabel>
      <CuTextField
        id="keyword-field"
        placeholder="ex. JS"
        field={{
          onChange: onChangeHandler,
          onKeyDown: handleKeyPress,
          inputRef: textFieldRef,
          value: inputValue,
        }}
        inputProps={{ maxLength: 7 }}
        fullWidth
      />
    </Box>
  )
}

const ChipsArray = ({
  data,
  mutate,
  isLoading,
  setToastMessage,
}: {
  mutate: () => void
  data: Array<IChip> | undefined | null
  isLoading: boolean
  setToastMessage: (message: IToastProps) => void
}) => {
  const handleDelete = async (chip: IChip) =>
    await axios
      .delete(
        `https://6a33dc92-80a8-466d-b83a-c2d3ce9b6a1d.mock.pstmn.io/api/v1/alarm/delete?keyword=${chip.label}`,
      )
      .then(() => {
        mutate()
        setToastMessage({
          severity: 'success',
          message: `'${chip.label}'를 알림 키워드 목록에서 삭제했습니다.`,
        })
      })
      .catch((error) => {
        console.log(error)
        setToastMessage({
          severity: 'error',
          message: `'${chip.label}'를 알림 키워드 목록에서 삭제하지 못했습니다`,
        })
      })

  return (
    <Stack direction={'row'} spacing={1} p={1}>
      {!data &&
        (isLoading ? (
          <Typography>로딩 중 입니다.</Typography>
        ) : (
          <Typography>등록한 알림 키워드가 없습니다.</Typography>
        ))}
      {data &&
        data.map((chip) => {
          return (
            <Chip
              key={chip.key}
              label={chip.label}
              onDelete={() => handleDelete(chip)}
            />
          )
        })}
    </Stack>
  )
}

const KeywordSettingBox = ({
  mutate,
  isPc,
  data,
  isLoading,
  error,
  setToastMessage,
}: {
  mutate: () => void
  isPc: boolean
  data: Array<IChip> | undefined | null
  isLoading: boolean
  error: any
  setToastMessage: (message: IToastProps) => void
}) => {
  const { isOpen, closeModal, openModal } = useModal()

  const deleteAll = async () => {
    console.log('전체 삭제')
    // await axios.delete('/api/v1/alarm/delete/all')
    closeModal()
  }

  return (
    <Box>
      <KeywordAddingField
        setToastMessage={setToastMessage}
        mutate={mutate}
        isPc={isPc}
      />
      <CuButton
        variant="text"
        message="전체 삭제"
        action={openModal}
      ></CuButton>
      {error ? (
        <Typography>데이터를 가져오지 못했습니다.</Typography>
      ) : (
        <ChipsArray
          setToastMessage={setToastMessage}
          mutate={mutate}
          data={data}
          isLoading={isLoading}
        />
      )}
      <CuModal
        ariaTitle="전체 삭제 경고 모달"
        ariaDescription="전체 삭제 경고문"
        open={isOpen}
        handleClose={closeModal}
        style={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box>
          <Typography>삭제</Typography>
          <Typography>모든 키워드를 삭제하시겠습니까?</Typography>
          <CuButton
            variant="contained"
            action={closeModal}
            message="취소"
            style={{ width: '50%' }}
          />
          <CuButton
            variant="contained"
            action={deleteAll}
            message="삭제"
            style={{ width: '50%' }}
          />
        </Box>
      </CuModal>
    </Box>
  )
}

const KeywordSetting = ({
  setToastMessage,
}: {
  setToastMessage: (message: IToastProps) => void
}) => {
  const { isPc } = useMedia()
  const { isOpen, closeModal, openModal } = useModal()

  const getKeywords = async (url: string) =>
    await axios.get<{ keyword: string } | null>(url).then((res) => {
      if (res.data?.keyword) {
        const newKeywords = res.data?.keyword.split('^&%')
        const newChipData = [] as Array<IChip>
        newKeywords.forEach((keyword, i) =>
          newChipData.push({ key: i, label: keyword }),
        )
        return newChipData
      }
      return null
    })

  const { isLoading, data, mutate, error } = useSWR<Array<IChip> | null>(
    'http://localhost:4000/alarm/1',
    getKeywords,
  )

  return (
    <div>
      <Typography>키워드 설정</Typography>
      {isPc ? (
        <KeywordSettingBox
          data={data}
          mutate={mutate}
          isPc={isPc}
          isLoading={isLoading}
          error={error}
          setToastMessage={setToastMessage}
        />
      ) : (
        <CuButton variant="text" message="키워드 관리" action={openModal} />
      )}
      <CuModal
        open={isOpen}
        handleClose={closeModal}
        ariaTitle="홈페이지 알림 키워드 설정 모달"
        ariaDescription="홈페이지 알림 키워드 추가 및 삭제"
        style={mobileModalStyle}
      >
        <Box sx={{ height: '100vmax', width: '100vmax', padding: '0 16px' }}>
          <Stack
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <BackButton
              action={closeModal}
              style={{
                border: 'none',
                color: 'black',
                padding: '3px 5px',
                width: '40px',
                height: '40px',
              }}
            />
            <Typography>키워드 관리</Typography>
            <Button
              sx={{
                border: 'none',
                color: 'black',
                padding: '3px 5px',
                width: '40px',
                height: '40px',
              }}
              aria-hidden
              disabled
            ></Button>
          </Stack>
          <KeywordSettingBox
            data={data}
            mutate={mutate}
            isPc={isPc}
            isLoading={isLoading}
            error={error}
            setToastMessage={setToastMessage}
          />
        </Box>
      </CuModal>
    </div>
  )
}

export default KeywordSetting
