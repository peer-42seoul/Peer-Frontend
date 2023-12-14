// import { Autocomplete, Box, Chip, Stack, TextField } from '@mui/material'
// import { ITag } from '@/types/IPostDetail'

// /**
//  *
//  * @param allTagList 드롭다운 시 나올 리스트입니다.
//  * @param data 선택한 값들의 리스트입니다 (useState로 관리해주세요)
//  * @param setData 선택한 값들의 리스트를 변경해주는 함수입니다 (useState로 관리해주세요)
//  */

// const TagAutoComplete = ({
//   datas,
//   setData,
//   allTagList,
//   placeholder,
// }: {
//   allTagList: ITag[]
//   datas: ITag[]
//   setData: any
//   placeholder?: string
// }) => {
//   /* 태그를 추가합니다 */
//   const handleInput = (event: React.SyntheticEvent, value: readonly ITag[]) => {
//     setData([...value])
//   }

//   /* 태그를 지웁니다 */
//   const handleDelete = (index: number) => {
//     setData((chips: string[]) =>
//       chips.filter((chip, cIndex) => cIndex !== index),
//     )
//   }

//   return (
//     <>
//       <Autocomplete
//         disableClearable
//         multiple
//         options={allTagList}
//         onChange={(event, value) => handleInput(event, value)}
//         value={datas}
//         getOptionLabel={(option) => option.name}
//         renderTags={() => <></>}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             placeholder={
//               placeholder ?? '프레임워크 또는 개발언어를 입력해주세요.'
//             }
//             sx={{ width: '416px' }}
//           />
//         )}
//       />
//       <Stack direction="row" gap={0.5}>
//         {datas.map((data, index) => {
//           return (
//             <Box key={index}>
//               <Chip
//                 label={data.name}
//                 variant="outlined"
//                 onDelete={() => {
//                   handleDelete(index)
//                 }}
//               />
//             </Box>
//           )
//         })}
//       </Stack>
//     </>
//   )
// }

// export default TagAutoComplete

import { Autocomplete, Stack, TextField } from '@mui/material'
import { ITag } from '@/types/IPostDetail'
import TagChip from '@/components/TagChip'
import { use, useEffect } from 'react'

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
