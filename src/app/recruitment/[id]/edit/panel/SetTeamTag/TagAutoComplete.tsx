import { Autocomplete, Box, Chip, Stack, TextField } from '@mui/material'
import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { tag } from '../../page'

/**
 *
 * @param list 드롭다운 시 나올 리스트입니다.
 * @param data 선택한 값들의 리스트입니다 (useState로 관리해주세요)
 * @param setData 선택한 값들의 리스트를 변경해주는 함수입니다 (useState로 관리해주세요)
 */

const dummyData1: tag = {
  tagName: 'java',
  tagColor: 'red',
}
const dummyData2: tag = {
  tagName: 'spring',
  tagColor: 'blue',
}
const dummyData3: tag = {
  tagName: 'react',
  tagColor: 'green',
}
const dummyDatas: tag[] = [dummyData1, dummyData2, dummyData3]

const TagAutoComplete = ({
  datas,
  setData,
  placeholder,
  openToast,
  setToastMessage
}: {
  datas: tag[]
  setData: any
  placeholder?: string
  openToast: () => void
  setToastMessage: Dispatch<SetStateAction<string>>
}) => {
  const [list, setList] = useState<tag[]>(dummyDatas)

  useEffect(() => { // 중복코드 이후 리팩토링예정
    axios.get('http://localhost:3000/recruitement/write').then((res) => {
      console.log(res)
      setList(res.data.tagList)
    }).catch((err) => {
      console.log('error ocurred!!' ,err)
      setToastMessage('태그를 불러오는데 실패했습니다.')
      openToast()
    })
  }, [])

  /* 태그를 추가합니다 */
  const handleInput = (
    event: React.SyntheticEvent,
    value: readonly tag[],
  ) => {
    setData([...value])
  }

  /* 태그를 지웁니다 */
  const handleDelete = (index: number) => {
    setData((chips: string[]) =>
      chips.filter((chip, cIndex) => cIndex !== index),
    )
  }

  return (
    <>
      <Autocomplete
        disableClearable
        multiple
        options={list}
        onChange={(event, value) => handleInput(event, value)}
        value={datas}
        getOptionLabel={(option) => option.tagName}
        renderTags={() => <></>}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={
              placeholder ?? '프레임워크 또는 개발언어를 입력해주세요.'
            }
          />
        )}
      />
      <Stack direction="row" gap={0.5}>
        {datas.map((data, index) => {
          return (
            <Box key={index}>
              <Chip
                label={data.tagName}
                variant="outlined"
                onDelete={() => {
                  handleDelete(index)
                }}
              />
            </Box>
          )
        })}
      </Stack>
    </>
  )
}

export default TagAutoComplete
