import { Stack } from '@mui/material'
import React from 'react'
import LabelWithIcon from '../LabelWithIcon'
import { TagIcon } from '@/icons'
import * as Style from './SkillInput.style'

interface IlinksProps {
  links: string[] | undefined
}

const LinksViewer = ({ links }: IlinksProps) => {
  const convertLink = (link: string) => {
    const httpPattern = /^https?:\/\//i
    if (!httpPattern.test(link)) {
      return `http://${link}`
    }
    return link
  }

  return (
    <Stack>
      <LabelWithIcon
        svgIcon={<TagIcon sx={Style.IconStyle} />}
        message="링크모음"
      />
      {links?.map((link: any) => {
        return (
          <Stack
            direction={'column'}
            spacing={'0.5rem'}
            width={'26rem'}
            key={link.id}
          >
            <Stack
              spacing={0.75}
              py={1}
              flexWrap={'wrap'}
              width={1}
              direction={'row'}
              useFlexGap
            >
              <a href={convertLink(link.link)} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Stack>
          </Stack>
        )
      })}
    </Stack>
  )
}

export default LinksViewer
