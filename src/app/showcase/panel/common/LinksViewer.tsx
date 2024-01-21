import { Stack } from '@mui/material'
import React from 'react'
import LabelWithIcon from '../LabelWithIcon'
import { TagIcon } from '@/icons'
import * as Style from './SkillInput.style'

interface IlinksProps {
  links: any
}

const LinksViewer = ({ links }: IlinksProps) => {
  return (
    <Stack>
      {links?.map((link: any) => {
        return (
          <Stack
            direction={'column'}
            spacing={'0.5rem'}
            width={'26rem'}
            key={link.id}
          >
            <LabelWithIcon
              svgIcon={<TagIcon sx={Style.IconStyle} />}
              message="링크모음"
            />
            <Stack
              spacing={0.75}
              py={1}
              flexWrap={'wrap'}
              width={1}
              direction={'row'}
              useFlexGap
            >
              <a href={link.linkUrl} target="_blank" rel="noreferrer">
                {link.linkName}
              </a>
            </Stack>
          </Stack>
        )
      })}
    </Stack>
  )
}

export default LinksViewer
