import React from 'react'
import { Stack, InputAdornment, Autocomplete, SxProps } from '@mui/material'
import TagIcon from '@/icons/TagIcon'
import LabelWithIcon from '../LabelWithIcon'
import CuTextField from '@/components/CuTextField'
import CuButton from '@/components/CuButton'
import * as Style from '../ShowcaseEditor.style'
import TagChip from '@/components/TagChip'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { IShowcaseEditorFields } from '@/types/IShowcaseEdit'
import { ITag } from '@/types/IPostDetail'

const AutocompleteStyle: SxProps = {
  fieldset: {
    height: '2rem',
    width: '26rem',
  },
}

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
    { name: 'React', color: '#FF5833' },
    { name: 'Vue', color: '#FF5833' },
    { name: 'test', color: '#FF5833' },
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
      {/* <TagAutoComplete datas={skills} setData={setData} tagList={tagList} /> */}
      <Autocomplete
        disableClearable
        multiple
        // sx={{ height: '2rem', width: '26rem' }}
        sx={AutocompleteStyle}
        options={nameList}
        onChange={handleInput}
        value={tags}
        renderTags={() => <></>}
        renderInput={(params: any) => (
          <CuTextField
            sx={AutocompleteStyle}
            {...params}
            placeholder="등록할 기술을 입력하세요."
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CuButton
                    variant="text"
                    style={{
                      color: 'text.normal',
                      marginRight: '0.75rem',
                      padding: '0rem 0.25rem',
                    }}
                    message="등록"
                    TypographyProps={{ variant: 'CaptionEmphasis' }}
                  />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
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
