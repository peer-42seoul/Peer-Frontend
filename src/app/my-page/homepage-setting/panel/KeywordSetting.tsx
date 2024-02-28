'use client'
import useAxiosWithAuth from '@/api/config'
import CuButton from '@/components/CuButton'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import useModal from '@/hook/useModal'
import { Box, Button, InputAdornment, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React, { useEffect, useRef, useState } from 'react'
import CuTextModal from '@/components/CuTextModal'
import TitleBox from '@/components/TitleBox'
import useMedia from '@/hook/useMedia'
import useToast from '@/states/useToast'
import { motion, AnimatePresence } from 'framer-motion'
import TagChip from '@/components/TagChip'
import { useTheme } from '@mui/material'
import { convertNonAlphabeticToHex } from '@/utils/convertNonAlpbabetToHex'

interface IChip {
  key: number
  label: string
}

const KeywordAddingField = ({
  keywordList,
  setData,
}: {
  keywordList: Array<IChip> | undefined | null
  setData: React.Dispatch<React.SetStateAction<Array<IChip>>>
}) => {
  const [inputValue, setInputValue] = useState<string>('' as string)
  const textFieldRef = useRef<HTMLInputElement | null>(null)
  const axiosWithAuth = useAxiosWithAuth()

  const { openToast, closeToast } = useToast()

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
      .post(`${process.env.NEXT_PUBLIC_CSR_API}/api/v1/alarm/add`, {
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
      })
      .then(() => {
        setData((prev) => [
          ...prev,
          {
            key: new Date().getTime(),
            label: trimmed,
          },
        ])
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
  isLoading,
  setData,
}: {
  data: Array<IChip>
  isLoading: boolean
  setData: React.Dispatch<React.SetStateAction<Array<IChip>>>
}) => {
  const theme = useTheme()

  const { openToast } = useToast()

  const axiosWithAuth = useAxiosWithAuth()
  const handleDelete = (label: string) => {
    // closeToast()
    return () =>
      axiosWithAuth
        .delete(
          `${
            process.env.NEXT_PUBLIC_CSR_API
          }/api/v1/alarm/delete?keyword=${convertNonAlphabeticToHex(label)}`,
        )
        .then(() => {
          openToast({
            severity: 'success',
            message: `'${label}'를 알림 키워드 목록에서 삭제했습니다.`,
          })
        })
        .then(() => {
          setData((prev) => prev.filter((keyword) => keyword.label !== label))
        })
        .catch((error) => {
          if (error.data.message) {
            openToast({
              severity: 'error',
              message: error.data.message,
            })
          } else {
            openToast({
              severity: 'error',
              message: (
                <>
                  <b>{label}</b>를 알림 키워드 목록에서 삭제하지 못했습니다,
                </>
              ),
            })
          }
        })
  }

  return (
    <AnimatePresence>
      <Grid container columnSpacing={0.75} rowSpacing={1} py={1}>
        {data?.length === 0 &&
          (isLoading ? (
            <Grid py={1}>
              <Typography variant="Caption" color={'text.alternative'}>
                로딩 중...
              </Typography>
            </Grid>
          ) : (
            <Grid py={1}>
              <Typography variant="Caption" color={'text.alternative'}>
                등록한 알림 키워드가 없어요.
              </Typography>
            </Grid>
          ))}
        {data.length > 0 &&
          data.map((chip) => {
            return (
              <Grid key={chip.key}>
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1.2, 1], opacity: 1 }}
                  exit={{ scale: [1, 0], opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TagChip
                    name={chip.label}
                    color={`${theme.palette.purple.strong}`}
                    onDelete={handleDelete(chip.label)}
                  />
                </motion.div>
              </Grid>
            )
          })}
      </Grid>
    </AnimatePresence>
  )
}

const KeywordDisplayBox = ({
  data,
  isLoading,
  error,
  setData,
}: {
  data: Array<IChip>
  isLoading: boolean
  error: any
  setData: React.Dispatch<React.SetStateAction<Array<IChip>>>
}) => {
  const { isOpen, closeModal, openModal } = useModal()
  const axiosWithAuth = useAxiosWithAuth()

  const { openToast, closeToast } = useToast()

  const deleteAll = async () => {
    closeToast()
    await axiosWithAuth
      .delete(`${process.env.NEXT_PUBLIC_CSR_API}/api/v1/alarm/delete/all`)
      .then(() => {
        closeModal()
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
        <Button
          variant="text"
          onClick={openModal}
          sx={{ padding: '0px 4px' }}
          disabled={!data.length}
        >
          <Typography variant="CaptionEmphasis" color={'text.alternative'}>
            전체 삭제
          </Typography>
        </Button>
      </Stack>
      {error ? (
        <Typography variant="Caption" color={'text.assistive'}>
          데이터를 가져오지 못했습니다.
        </Typography>
      ) : (
        <ChipsArray data={data} isLoading={isLoading} setData={setData} />
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
  const [data, setData] = useState<Array<IChip>>([] as Array<IChip>)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

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
      return [] as Array<IChip>
    })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const result = await getKeywords(
          `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/alarm`,
        )
        setData(result)
      } catch (error) {
        setError(error as any)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

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
      <KeywordAddingField keywordList={data} setData={setData} />
      <KeywordDisplayBox
        data={data}
        isLoading={isLoading}
        error={error}
        setData={setData}
      />
    </TitleBox>
  )
}

export default KeywordSetting
