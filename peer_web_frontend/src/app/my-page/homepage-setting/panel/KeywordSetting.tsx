'use client'
import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import { Box, Chip, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

interface IChip {
  key: number
  label: string
}

const KeywordAddingField = ({
  mutate,
  setKeywords,
}: {
  mutate: (data: Array<IChip> | null) => void
  setKeywords: (keyword: Array<IChip> | null) => void
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
          const newData = [] as Array<IChip>
          mutate(newData)
          return newData
        })
        .then((data) => setKeywords(data))
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
        키워드
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
      />
    </Box>
  )
}

const ChipsArray = ({
  data,
  setKeywords,
  mutate,
}: {
  mutate: (data: Array<IChip> | null) => void
  setKeywords: (keyword: Array<IChip> | null) => void
  data: Array<IChip> | undefined | null
}) => {
  const handleDelete = (chip: IChip) => {
    return () =>
      axios
        .delete(
          `https://6a33dc92-80a8-466d-b83a-c2d3ce9b6a1d.mock.pstmn.io/api/v1/alarm/delete?keyword=${chip.label}`,
        )
        .then(() => {
          console.log('키워드 삭제에 성공하였습니다!', chip.label)
          const newData = [] as Array<IChip>
          mutate(newData)
          console.log('newData', newData)
          return newData
        })
        .then((data) => setKeywords(data))
  }

  return (
    <Stack direction={'row'} spacing={1} p={1}>
      {!data && <Typography>등록한 알림 키워드가 없습니다.</Typography>}
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

const KeywordSetting = () => {
  const [keywords, setKeywords] = useState<Array<IChip> | null>(null)

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

  const { isLoading, data, mutate } = useSWR<Array<IChip> | null>(
    'http://localhost:4000/alarm/1',
    getKeywords,
  )

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      setKeywords(data)
    }
  }, [isLoading, data])

  return (
    <div>
      <KeywordAddingField mutate={mutate} setKeywords={setKeywords} />
      {keywords && (
        <ChipsArray mutate={mutate} data={keywords} setKeywords={setKeywords} />
      )}
      {!keywords && <Typography>등록한 키워드가 없습니다.</Typography>}
    </div>
  )
}

export default KeywordSetting
