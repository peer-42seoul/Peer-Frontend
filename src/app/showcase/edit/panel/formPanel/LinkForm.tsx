import { IShowcaseEditorFields } from '@/types/IShowcaseEdit'
import { Stack, Typography } from '@mui/material'
import React from 'react'
import LabelWithIcon from '../LabelWithIcon'
import LinkIcon from '@/icons/LinkIcon'
import * as Style from '../ShowcaseEditor.style'
import Link from 'next/link'

interface IlinksProps {
  links: []
}

const LinkForm = ({ links }: IlinksProps) => {
  return (
    <Stack width={'26rem'} spacing={'0.5rem'}>
      <Stack direction={'column'} spacing={'0.5rem'}>
        <LabelWithIcon
          svgIcon={<LinkIcon sx={Style.IconStyle} />}
          message={'링크'}
        />
        <Stack direction={'column'} spacing={'0.5rem'}>
          {links.map((link, index) => (
            <Link href={link} key={index}>
              {link}
            </Link>
          ))}
        </Stack>
        {/* <IconButton
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
        </IconButton> */}
      </Stack>
      {/* {fields.map((field, index) => (
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
                autoComplete="off"
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
                autoComplete="off"
              />
            )}
          />
        </Stack>
      ))} */}
    </Stack>
  )
}

export default LinkForm
