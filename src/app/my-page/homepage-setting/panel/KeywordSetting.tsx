'use client'
import BackButton from '@/components/BackButton'
import CuButton from '@/components/CuButton'
import CuModal from '@/components/CuModal'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import useMedia from '@/hook/useMedia'
import useModal from '@/hook/useModal'
import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import useSWR from 'swr'

interface IChip {
  key: number
  label: string
}

const KeywordAddingField = ({
  mutate,
  isPc,
}: {
  mutate: () => void
  isPc: boolean
}) => {
  const [inputValue, setInputValue] = useState<string>('' as string)
  const textFieldRef = useRef<HTMLInputElement | null>(null)

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (inputValue === '') return
      await axios
        .post(`http://localhost:4000/alarmAdd`, { newKeyword: inputValue })
        .then(() => console.log('api 전송 성공!'))
        .then(() => {
          mutate()
        })
        .catch((error) => console.log(error))
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
        fullWidth
      />
    </Box>
  )
}

const ChipsArray = ({
  data,
  mutate,
  isLoading,
}: {
  mutate: () => void
  data: Array<IChip> | undefined | null
  isLoading: boolean
}) => {
  const handleDelete = (chip: IChip) => {
    return async () =>
      await axios
        .delete(
          `https://6a33dc92-80a8-466d-b83a-c2d3ce9b6a1d.mock.pstmn.io/api/v1/alarm/delete?keyword=${chip.label}`,
        )
        .then(() => {
          console.log('키워드 삭제에 성공하였습니다!', chip.label)
          mutate()
        })
  }

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
              onDelete={handleDelete(chip)}
            />
          )
        })}
    </Stack>
  )
}

const KeywordSettingBox = ({
  mutate,
  isPc,
  deleteAll,
  data,
  isLoading,
  error,
}: {
  mutate: () => void
  isPc: boolean
  deleteAll: () => void
  data: Array<IChip> | undefined | null
  isLoading: boolean
  error: any
}) => {
  return (
    <Box>
      <KeywordAddingField mutate={mutate} isPc={isPc} />
      <CuButton
        variant="text"
        message="전체 삭제"
        action={deleteAll}
      ></CuButton>
      {error ? (
        <Typography>데이터를 가져오는 데 실패했습니다.</Typography>
      ) : (
        <ChipsArray mutate={mutate} data={data} isLoading={isLoading} />
      )}
    </Box>
  )
}

const KeywordSetting = () => {
  // const [keywords, setKeywords] = useState<Array<IChip> | null>(null)
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

  const deleteAll = async () => {
    console.log('전체 삭제')
    // await axios.delete('/api/v1/alarm/delete/all')
  }

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
          deleteAll={() => deleteAll()}
          isPc={isPc}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <CuButton variant="text" message="키워드 관리" action={openModal} />
      )}
      <CuModal
        open={isOpen}
        handleClose={closeModal}
        ariaTitle="홈페이지 알림 키워드 설정 모달"
        ariaDescription="홈페이지 알림 키워드 추가 및 삭제"
        style={{
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
        }}
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
            deleteAll={() => deleteAll()}
            isPc={isPc}
            isLoading={isLoading}
            error={error}
          />
        </Box>
      </CuModal>
    </div>
  )
}

export default KeywordSetting
