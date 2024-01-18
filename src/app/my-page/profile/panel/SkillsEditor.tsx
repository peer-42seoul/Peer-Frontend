import CuModal from '@/components/CuModal'
import TagChip from '@/components/TagChip'
import { ITag } from '@/types/IPostDetail'
import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

const SkillsEditor = ({
  open,
  mutate,
  closeModal,
}: {
  open: boolean
  mutate: () => void
  closeModal: () => void
}) => {
  const [selected, setSelected] = useState([] as ITag[])
  const [tagList, setTagList] = useState([] as ITag[])

  const handleInput = (_: any, value: readonly string[]) => {
    const selectedTags = value
      .map((tagName) => {
        return tagList.find((tag) => tag.name === tagName)
      })
      .filter(Boolean) as ITag[]
    setSelected(selectedTags)
  }
  return (
    <CuModal
      open={open}
      onClose={closeModal}
      title={'스킬 수정'}
      mobileFullSize
      containedButton={{
        text: '완료',
        onClick: () => {
          mutate()
          closeModal()
        },
      }}
      textButton={{
        text: '취소',
        onClick: closeModal,
      }}
    >
      <Stack>
        <Typography variant={'CaptionEmphasis'} color={'text.strong'}>
          나의 스킬
        </Typography>
        <Autocomplete
          multiple
          options={tagList.map((tag) => tag.name)}
          onChange={handleInput}
          renderTags={() => <></>}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder={'프레임워크 또는 개발언어를 입력해주세요.'}
            />
          )}
        />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant={'CaptionEmphasis'} color={'text.strong'}>
            선택한 스킬
          </Typography>
          <Button variant={'text'}>전체 삭제</Button>
        </Stack>
        {selected.map((tag) => {
          return (
            <TagChip
              key={tag.tagId}
              name={tag.name}
              onDelete={() => {
                setSelected((prev) =>
                  prev.filter((tag) => tag.tagId !== tag.tagId),
                )
              }}
              color={tag.color}
            />
          )
        })}
      </Stack>
    </CuModal>
  )
}

export default SkillsEditor
