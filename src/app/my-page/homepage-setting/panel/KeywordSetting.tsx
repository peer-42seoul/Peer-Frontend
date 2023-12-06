'use client'
import useAxiosWithAuth from '@/api/config'
import CuButton from '@/components/CuButton'
import CuModal from '@/components/CuModal'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import useModal from '@/hook/useModal'
import {
  AlertColor,
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material'
import React, { useRef, useState } from 'react'
import useSWR from 'swr'
import TagChip from './TagChip'
import CuTextModal from '@/components/CuTextModal'

interface IChip {
  key: number
  label: string
}

interface IToastProps {
  severity: AlertColor | undefined
  message: string
}

const KeywordAddingField = ({
  mutate,
  setToastMessage,
  keywordList,
}: {
  mutate: () => void
  setToastMessage: (message: IToastProps) => void
  keywordList: Array<IChip> | undefined | null
}) => {
  const [inputValue, setInputValue] = useState<string>('' as string)
  const textFieldRef = useRef<HTMLInputElement | null>(null)
  const axiosWithAuth = useAxiosWithAuth()

  const validateData = (trimmed: string) => {
    if (trimmed.length < 2) {
      setToastMessage({
        severity: 'error',
        message: '알림 키워드는 양 끝 공백은 제외 최소 2자 이상이어야 합니다.',
      })
      return false
    } else if (keywordList?.some((keyword) => keyword.label === trimmed)) {
      setToastMessage({
        severity: 'error',
        message: '이미 등록된 알림 키워드입니다.',
      })
      return false
    }
    return true
  }

  const addKeyword = async (trimmed: string) => {
    await axiosWithAuth
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/alarm/add`, {
        newKeyword: trimmed,
      })
      .then(() => {
        setToastMessage({
          severity: 'success',
          message: `'${trimmed}'를 알림 키워드 목록에 추가하였습니다.`,
        })
        mutate()
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setToastMessage({
            severity: 'error',
            message: `${error.response.data.message}`,
          })
        } else {
          setToastMessage({
            severity: 'error',
            message: `'${trimmed}'를 알림 키워드 목록에 추가하지 못했습니다.`,
          })
        }
      })
  }

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const trimmed = inputValue.trim()
      if (validateData(trimmed) === false) return
      await addKeyword(trimmed)
      setInputValue('' as string)
    }
  }

  const handleOnClick = async () => {
    const trimmed = inputValue.trim()
    if (validateData(trimmed) === false) return
    await addKeyword(trimmed)
    setInputValue('' as string)
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value) // 입력 값이 변경될 때 상태 업데이트
  }

  return (
    <Box>
      <CuTextField
        id="keyword-field"
        placeholder="ex. JS"
        onChange={onChangeHandler}
        onKeyDown={handleKeyPress}
        inputRef={textFieldRef}
        value={inputValue}
        inputProps={{ maxLength: 7 }}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CuButton
                action={handleOnClick}
                variant="contained"
                message="추가"
              />
            </InputAdornment>
          ),
        }}
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
  return (
    <Grid container columnSpacing={0.75} rowSpacing={1} py={1}>
      {!data &&
        (isLoading ? (
          <Grid item py={1}>
            <Typography variant="Caption" color={'text.alternative'}>
              로딩 중 입니다.
            </Typography>
          </Grid>
        ) : (
          <Grid item py={1}>
            <Typography variant="Caption" color={'text.alternative'}>
              등록한 알림 키워드가 없습니다.
            </Typography>
          </Grid>
        ))}
      {data &&
        data.map((chip) => {
          return (
            <TagChip
              key={chip.key}
              mutate={mutate}
              setToastMessage={setToastMessage}
              chip={chip}
            />
          )
        })}
    </Grid>
  )
}

const KeywordDisplayBox = ({
  mutate,
  data,
  isLoading,
  error,
  setToastMessage,
}: {
  mutate: () => void
  data: Array<IChip> | undefined | null
  isLoading: boolean
  error: any
  setToastMessage: (message: IToastProps) => void
}) => {
  const { isOpen, closeModal, openModal } = useModal()
  const axiosWithAuth = useAxiosWithAuth()

  const deleteAll = async () => {
    console.log('전체 삭제')
    await axiosWithAuth
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/alarm/delete/all`)
      .then(() => {
        closeModal()
        mutate()
      })
  }

  return (
    <Box id="keyword-setting-modal-description">
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography variant="CaptionEmphasis" color={'text.normal'}>
          등록된 키워드
        </Typography>
        <Button variant="text" onClick={openModal} sx={{ padding: '0px 4px' }}>
          <Typography variant="CaptionEmphasis" color={'text.alternative'}>
            전체 삭제
          </Typography>
        </Button>
      </Stack>
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
      <CuTextModal
        open={isOpen}
        onClose={closeModal}
        title={'삭제'}
        content={'모든 키워드를 삭제하시겠습니까?'}
        containedButton={{
          text: '삭제',
          onClick: deleteAll,
        }}
        textButton={{
          text: '취소',
          onClick: closeModal,
        }}
      />
    </Box>
  )
}

const KeywordSetting = ({
  setToastMessage,
}: {
  setToastMessage: (message: IToastProps) => void
}) => {
  const axiosWithAuth = useAxiosWithAuth()

  const getKeywords = async (url: string) =>
    await axiosWithAuth.get<{ keyword: string } | null>(url).then((res) => {
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/alarm`,
    getKeywords,
  )

  return (
    <Stack
      p={3}
      spacing={3}
      alignSelf={'stretch'}
      bgcolor={'background.secondary'}
      borderRadius={2}
    >
      <CuTextFieldLabel style={{ margin: '8px 0px' }} htmlFor="keyword-field">
        <Typography variant="Title3Emphasis" color={'text.normal'}>
          키워드 설정
        </Typography>
      </CuTextFieldLabel>
      <KeywordAddingField
        setToastMessage={setToastMessage}
        mutate={mutate}
        keywordList={data}
      />
      <KeywordDisplayBox
        setToastMessage={setToastMessage}
        mutate={mutate}
        data={data}
        isLoading={isLoading}
        error={error}
      />
    </Stack>
  )
}

export default KeywordSetting
