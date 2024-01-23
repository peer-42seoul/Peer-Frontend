'use client'
import useAxiosWithAuth from '@/api/config'
import CuButton from '@/components/CuButton'
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
import TitleBox from '@/components/TitleBox'
import useMedia from '@/hook/useMedia'
import useToast from '@/states/useToast'

interface IChip {
  key: number
  label: string
}

const KeywordAddingField = ({
  mutate,
  openToast,
  closeToast,
  keywordList,
}: {
  mutate: () => void
  openToast: ({
    severity,
    message,
  }: {
    severity: AlertColor
    message: React.ReactNode
  }) => void
  closeToast: () => void
  keywordList: Array<IChip> | undefined | null
}) => {
  const [inputValue, setInputValue] = useState<string>('' as string)
  const textFieldRef = useRef<HTMLInputElement | null>(null)
  const axiosWithAuth = useAxiosWithAuth()

  const validateData = (trimmed: string) => {
    closeToast()
    if (trimmed.length < 2) {
      openToast({
        severity: 'error',
        message: '알림 키워드는 최소 2자 이상이어야 합니다.',
      })
      return false
    } else if (keywordList?.some((keyword) => keyword.label === trimmed)) {
      openToast({
        severity: 'error',
        message: '이미 등록된 알림 키워드입니다.',
      })
      return false
    }
    return true
  }

  const addKeyword = async (trimmed: string) => {
    closeToast()
    await axiosWithAuth
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/alarm/add`, {
        newKeyword: trimmed,
      })
      .then(() => {
        openToast({
          severity: 'success',
          message: (
            <>
              <b>{trimmed}</b>(이)가 키워드로 등록되었습니다.
            </>
          ),
        })
        mutate()
      })
      .catch((error) => {
        if (error.response.status === 400) {
          openToast({
            severity: 'error',
            message: `${error.response.data.message}`,
          })
        } else {
          openToast({
            severity: 'error',
            message: (
              <>
                <b>{trimmed}</b>(을)를 알림 키워드 목록에 추가하지 못했습니다.
              </>
            ),
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
                variant="text"
                message="추가"
                TypographyProps={{
                  variant: 'CaptionEmphasis',
                  color: 'text.alternative',
                }}
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
}: {
  mutate: () => void
  data: Array<IChip> | undefined | null
  isLoading: boolean
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
          return <TagChip key={chip.key} mutate={mutate} chip={chip} />
        })}
    </Grid>
  )
}

const KeywordDisplayBox = ({
  mutate,
  data,
  isLoading,
  error,
  openToast,
  closeToast,
}: {
  mutate: () => void
  data: Array<IChip> | undefined | null
  isLoading: boolean
  error: any
  openToast: ({
    severity,
    message,
  }: {
    severity: AlertColor
    message: React.ReactNode
  }) => void
  closeToast: () => void
}) => {
  const { isOpen, closeModal, openModal } = useModal()
  const axiosWithAuth = useAxiosWithAuth()

  const deleteAll = async () => {
    closeToast()
    await axiosWithAuth
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/alarm/delete/all`)
      .then(() => {
        closeModal()
        mutate()
        openToast({
          severity: 'success',
          message: '모든 키워드를 삭제하였습니다.',
        })
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
        <ChipsArray mutate={mutate} data={data} isLoading={isLoading} />
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

const KeywordSetting = () => {
  const { isPc } = useMedia()

  const { openToast, closeToast } = useToast()

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
    <TitleBox
      title="알림 설정"
      titleComponent={
        <Stack
          direction={'row'}
          justifyContent={'flex-start'}
          alignItems={'center'}
          height={'2.5rem'}
        >
          <CuTextFieldLabel htmlFor="keyword-field">
            <Typography
              variant={isPc ? 'Title3Emphasis' : 'Body1Emphasis'}
              component={'h3'}
              color={'text.normal'}
            >
              키워드 설정
            </Typography>
          </CuTextFieldLabel>
        </Stack>
      }
    >
      <KeywordAddingField
        openToast={openToast}
        closeToast={closeToast}
        mutate={mutate}
        keywordList={data}
      />
      <KeywordDisplayBox
        openToast={openToast}
        closeToast={closeToast}
        mutate={mutate}
        data={data}
        isLoading={isLoading}
        error={error}
      />
    </TitleBox>
  )
}

export default KeywordSetting
