import { Autocomplete, Stack, TextField } from '@mui/material'
import { ITag } from '@/types/IPostDetail'
import TagChip from '@/components/TagChip'

/**
 *
 * @param list 드롭다운 시 나올 리스트입니다.
 * @param datas 선택한 값들의 리스트입니다 (useState로 관리해주세요)
 * @param setData 선택한 값들의 리스트를 변경해주는 함수입니다 (useState로 관리해주세요)
 * @param placeholder 플레이스홀더입니다
 * @param style 스타일입니다
 * 
 * datas의 타입은 ITag로 바뀌었고, setDatas로 내보내지는 데이터의 타입도 ITag로 바뀌었습니다.
 * ITag 타입에는 id 타입이 추가되었고, 이를 사용해 태그를 삭제할 수 있습니다.
 * Tag API 변경으로 인해 수정되었습니다. 2021.12.14 
 */

const TagAutoComplete = ({
  tagList,
  datas,
  setData,
  placeholder,
  style,
}: {
  tagList: ITag[]
  datas: ITag[]
  setData: any
  placeholder?: string
  style?: any
}) => {
  const nameList = tagList?.map(({ name }) => name)

  /* 태그를 추가합니다 */
  const handleInput = (
    event: React.SyntheticEvent,
    value: readonly string[],
  ) => {
    const selectedTags = value
      .map((tagName) => {
        return tagList.find((tag) => tag.name === tagName)
      })
      .filter(Boolean) as ITag[]
    setData(selectedTags)
  }

  /* 태그를 지웁니다 */
  const handleDelete = (id: number) => {
    setData((chips: ITag[]) =>
      chips.filter((tag) => tag.tagId !== id),
    )
  }

  return (
    <>
      <Autocomplete
        sx={style}
        disableClearable
        multiple
        options={nameList}
        onChange={handleInput}
        value={datas.map((tag: ITag) => tag.name)}
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
        {datas?.map((tag: ITag) => {
          return (
            <TagChip
              key={tag.tagId}
              name={tag.name ?? ''}
              onDelete={() => {
                handleDelete(tag.tagId)
              }}
              color={tag?.color ?? ''}
            />
          )
        })}
      </Stack>
    </>
  )
}

export default TagAutoComplete
