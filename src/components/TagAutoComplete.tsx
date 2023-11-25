import { Autocomplete, Chip, Stack, TextField } from '@mui/material'
import { ITag } from '@/types/IPostDetail'

/**
 *
 * @param list 드롭다운 시 나올 리스트입니다.
 * @param datas 선택한 값들의 리스트입니다 (useState로 관리해주세요)
 * @param setData 선택한 값들의 리스트를 변경해주는 함수입니다 (useState로 관리해주세요)
 */

const TagAutoComplete = ({
  tagList,
  datas,
  setData,
  placeholder,
}: {
  tagList: ITag[]
  datas: string[]
  setData: any
  placeholder?: string
}) => {
  const nameList = tagList?.map(({ name }) => name)

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

  const getBgColor = (color: string) => {
    if (!color) return ''
    const r = parseInt(color.slice(1, 3), 16),
      g = parseInt(color.slice(3, 5), 16),
      b = parseInt(color.slice(5, 7), 16)
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + '0.3' + ')'
  }

  return (
    <>
      <Autocomplete
        disableClearable
        multiple
        options={nameList}
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
      <Stack gap={1} direction={'row'}>
        {datas?.map((tag: string, idx: number) => {
          const selectTag = tagList?.find((item) => item.name === tag)
          if (!selectTag) return
          const color = selectTag.color
          const backgroundColor = getBgColor(color)

          return (
            <Chip
              label={selectTag?.name ?? ''}
              size="small"
              key={idx}
              style={{
                color,
                backgroundColor,
                borderRadius: 5,
              }}
              onDelete={() => {
                handleDelete(idx)
              }}
            />
          )
        })}
      </Stack>
    </>
  )
}

export default TagAutoComplete
