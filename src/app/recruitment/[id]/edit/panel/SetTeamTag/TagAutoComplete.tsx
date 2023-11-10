import { Autocomplete, Box, Chip, Stack, TextField } from '@mui/material'
import { ITag } from '@/types/IPostDetail'

/**
 *
 * @param allTagList 드롭다운 시 나올 리스트입니다.
 * @param data 선택한 값들의 리스트입니다 (useState로 관리해주세요)
 * @param setData 선택한 값들의 리스트를 변경해주는 함수입니다 (useState로 관리해주세요)
 */

const TagAutoComplete = ({
  datas,
  setData,
  allTagList,
  placeholder,
}: {
  datas: ITag[]
  setData: any
  allTagList: ITag[]
  placeholder?: string
}) => {
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
        options={allTagList}
        onChange={(event, value) => handleInput(event, value)}
        value={datas}
        getOptionLabel={(option) => option.name}
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
                label={data.name}
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
