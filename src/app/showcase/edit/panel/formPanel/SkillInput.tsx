import React from 'react'
import { Stack, InputAdornment } from '@mui/material'
import { TagIcon } from '../icons'
import LabelWithIcon from '../LabelWithIcon'
import CuTextField from '@/components/CuTextField'
import CuButton from '@/components/CuButton'
import * as Style from '../ShowcaseEditor.style'
import TagChip from '@/components/TagChip'

const SkillInput = () => {
  return (
    <Stack direction={'column'} spacing={'0.5rem'} width={'26rem'}>
      <LabelWithIcon
        svgIcon={<TagIcon sx={Style.IconStyle} />}
        message="기술 스택"
      />
      <CuTextField
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
      <Stack
        spacing={0.75}
        py={1}
        flexWrap={'wrap'}
        width={1}
        direction={'row'}
        useFlexGap
      >
        <TagChip
          name={'React'}
          color={'#FF5833'}
          deleteIcon
          onDelete={() => {
            console.log('delete')
          }}
        />

        <TagChip
          name={'React'}
          color={'#FF5833'}
          deleteIcon
          onDelete={() => {
            console.log('delete')
          }}
        />

        <TagChip
          name={'React'}
          color={'#FF5833'}
          deleteIcon
          onDelete={() => {
            console.log('delete')
          }}
        />

        <TagChip
          name={'React'}
          color={'#FF5833'}
          deleteIcon
          onDelete={() => {
            console.log('delete')
          }}
        />

        <TagChip
          name={'React'}
          color={'#FF5833'}
          deleteIcon
          onDelete={() => {
            console.log('delete')
          }}
        />

        <TagChip
          name={'React'}
          color={'#FF5833'}
          deleteIcon
          onDelete={() => {
            console.log('delete')
          }}
        />

        <TagChip
          name={'React'}
          color={'#FF5833'}
          deleteIcon
          onDelete={() => {
            console.log('delete')
          }}
        />

        <TagChip
          name={'React'}
          color={'#FF5833'}
          deleteIcon
          onDelete={() => {
            console.log('delete')
          }}
        />
      </Stack>
    </Stack>
  )
}

export default SkillInput
