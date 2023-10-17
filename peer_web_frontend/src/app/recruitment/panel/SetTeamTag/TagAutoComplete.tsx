import { Autocomplete, Box, Chip, Stack, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'

/**
 *
 * @param list 드롭다운 시 나올 리스트입니다.
 * @param data 선택한 값들의 리스트입니다 (useState로 관리해주세요)
 * @param setData 선택한 값들의 리스트를 변경해주는 함수입니다 (useState로 관리해주세요)
 */

const TagAutoComplete = ({
  datas,
  setData,
  placeholder,
}: {
  datas: string[]
  setData: any
  placeholder?: string
}) => {
  const [list, setList] = useState([
    'javaScript',
    'react',
    'TypeScript',
    'NextJs',
  ])

  useEffect(() => {
    axios.get('http://localhost:3000/recruitement/write').then((res) => {
      console.log(res)
      setList(res.data.tagList)
    })
  }, [])

  /* 태그를 추가합니다 */
  const handleInput = (
    event: React.SyntheticEvent,
    value: readonly string[],
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
        onChange={handleInput}
        value={datas}
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
                label={data}
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
