import { Autocomplete, Box, Chip, Stack, TextField } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ITag } from '@/types/IPostDetail'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'

/**
 *
 * @param list 드롭다운 시 나올 리스트입니다.
 * @param data 선택한 값들의 리스트입니다 (useState로 관리해주세요)
 * @param setData 선택한 값들의 리스트를 변경해주는 함수입니다 (useState로 관리해주세요)
 */

const dummyData1: ITag = {
  tagName: 'java',
  tagColor: 'red',
}
const dummyData2: ITag = {
  tagName: 'spring',
  tagColor: 'blue',
}
const dummyData3: ITag = {
  tagName: 'react',
  tagColor: 'green',
}
const dummyDatas: ITag[] = [dummyData1, dummyData2, dummyData3]

const TagAutoComplete = ({
  datas,
  setData,
  placeholder,
  openToast,
  setToastMessage,
  params,
}: {
  datas: ITag[]
  setData: any
  placeholder?: string
  openToast: () => void
  setToastMessage: Dispatch<SetStateAction<string>>
  params?: { recruit_id: string }
}) => {
  const [list, setList] = useState<ITag[]>(dummyDatas)
  const axiosInstance = useAxiosWithAuth()
  const { data } = useSWR(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/edit/${params?.recruit_id}`,
    (url:string) => axiosInstance.get(url).then((res) => res.data),
  )

  useEffect(() => {
    if (!data) {
      console.log('error ocurred!!')
      setToastMessage('태그를 불러오는데 실패했습니다.')
      openToast()
    } else {
      console.log('ITag fetching success', data)
      setList(data.tagList)
    }
  }, [data])

  /* 태그를 추가합니다 */
  const handleInput = (event: React.SyntheticEvent, value: readonly ITag[]) => {
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
