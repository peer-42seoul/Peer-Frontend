import { IShowcaseEditorFields } from '@/types/IShowcaseEdit'
import { IconButton, Stack } from '@mui/material'
import React from 'react'
import {
  Control,
  Controller,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from 'react-hook-form'
import LabelWithIcon from '../LabelWithIcon'
import LinkIcon from '@/icons/LinkIcon'
import CuTextField from '@/components/CuTextField'
import * as Style from '../ShowcaseEditor.style'
import PlusIcon from '@/icons/PlusIcon'

const LinkForm = ({
  fields,
  append,
  // remove,
  control,
}: {
  fields: FieldArrayWithId<IShowcaseEditorFields, 'links', 'id'>[]
  append: UseFieldArrayAppend<IShowcaseEditorFields, 'links'>
  remove: UseFieldArrayRemove
  control: Control<IShowcaseEditorFields, any>
}) => {
  return (
    <Stack width={'26rem'} spacing={'0.5rem'}>
      <Stack
        direction={'row'}
        spacing={'0.5rem'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <LabelWithIcon
          svgIcon={<LinkIcon sx={Style.IconStyle} />}
          message={'링크'}
        />
        <IconButton
          onClick={() => {
            if (fields.length >= 5) return
            append({
              id: 0,
              linkName: '',
              linkUrl: '',
            })
          }}
        >
          <PlusIcon sx={Style.IconStyle} />
        </IconButton>
      </Stack>
      {fields.map((field, index) => (
        <Stack key={field.id} direction={'row'} spacing={'0.5rem'}>
          <Controller
            name={`links.${index}.linkName`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CuTextField
                onChange={onChange}
                value={value}
                placeholder={'링크 이름'}
                sx={{ width: '12.8rem', height: '2rem' }}
              />
            )}
          />
          <Controller
            name={`links.${index}.linkUrl`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <CuTextField
                onChange={onChange}
                value={value}
                placeholder={'링크 주소'}
                sx={{ width: '12.8rem', height: '2rem' }}
              />
            )}
          />
        </Stack>
      ))}
    </Stack>
  )
}

export default LinkForm
