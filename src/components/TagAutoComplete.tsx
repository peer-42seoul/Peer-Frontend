import { Autocomplete, Stack, TextField } from '@mui/material'
import { ITag } from '@/types/IPostDetail'
import TagChip from '@/components/TagChip'

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
          return (
            <TagChip
              key={idx}
              name={selectTag?.name ?? ''}
              onDelete={() => {
                handleDelete(idx)
              }}
              color={selectTag?.color ?? ''}
            />
          )
        })}
      </Stack>
    </>
  )
}

export default TagAutoComplete
