import React from 'react'
import {
  Stack,
  InputAdornment,
  Autocomplete,
  Typography,
  Box,
} from '@mui/material'
import TagIcon from '@/icons/TagIcon'
import LabelWithIcon from '../LabelWithIcon'
import CuTextField from '@/components/CuTextField'
import * as Style from '../ShowcaseEditor.style'
import TagChip from '@/components/TagChip'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { IShowcaseEditorFields } from '@/types/IShowcaseEdit'
import { ITag } from '@/types/IPostDetail'
import { Button } from '@mui/material'
import TagAutoComplete from '@/components/TagAutoComplete'

const SkillInput = ({
  setValue,
  watch,
}: {
  setValue: UseFormSetValue<IShowcaseEditorFields>
  watch: UseFormWatch<IShowcaseEditorFields>
}) => {
  const tags = watch('tags')
  const setData = (data: string[]) => {
    setValue('tags', data)
  }

  const tagList: ITag[] = [
    { name: 'React', color: '#FF5833', tagId: 1, createdAt: '', updatedAt: '' },
    { name: 'vue', color: '#FF5833', tagId: 2, createdAt: '', updatedAt: '' },
    { name: 'js', color: '#FF5833', tagId: 3, createdAt: '', updatedAt: '' },
  ]

  const nameList = tagList?.map(({ name }) => name)

  const handleInput = (
    event: React.SyntheticEvent,
    value: readonly string[],
  ) => {
    setData([...value])
  }

  /* 태그를 지웁니다 */
  const handleDelete = (index: number) => {
    setData(tags.filter((tag, cIndex) => cIndex !== index))
  }

  return (
    <Stack direction={'column'} spacing={'0.5rem'} width={'26rem'}>
      <LabelWithIcon
        svgIcon={<TagIcon sx={Style.IconStyle} />}
        message="기술 스택"
      />
      {/* MEMO : 작업 당시에는 TagAutoComplete과 UI가 같았으나 현재는 달라진 것으로 보임.
          우선 UI는 이전에 구현해둔 것이 있으니 백엔드와 논의 후 로직 결정할 것 */}
      {/* <TagAutoComplete datas={tagList} setData={setData} tagList={tagList} /> */}
      {/* 아래 코드는 이전에 작업 해두었던 것 */}
      {/* <Box sx={{ height: '2rem', width: '26rem' }}>
        <Autocomplete
          disableClearable
          multiple
          forcePopupIcon={false}
          sx={Style.AutocompleteStyle}
          options={nameList}
          onChange={handleInput}
          value={tags}
          renderTags={() => <></>}
          renderInput={(params: any) => (
            <CuTextField
              sx={{
                height: '2rem',
                width: '26rem',
              }}
              {...params}
              placeholder="등록할 기술을 입력하세요."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="text"
                      sx={{
                        color: 'text.normal',
                        marginRight: '0.75rem',
                        padding: '0rem 0.25rem',
                      }}
                    >
                      <Typography variant="Caption">등록</Typography>
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Box> */}
      <Stack
        spacing={0.75}
        py={1}
        flexWrap={'wrap'}
        width={1}
        direction={'row'}
        useFlexGap
      >
        {tags?.map((tag: string, idx: number) => {
          const selectTag = tagList?.find((item) => item.name === tag)
          return (
            <TagChip
              key={idx}
              name={selectTag?.name ?? ''}
              color={selectTag?.color ?? ''}
              deleteIcon
              onDelete={() => {
                handleDelete(idx)
              }}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}

export default SkillInput
