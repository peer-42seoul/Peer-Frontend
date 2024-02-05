import { Stack, Typography } from '@mui/material'
import React from 'react'
import LabelWithIcon from '../../../../components/LabelWithIcon'
import { TagIcon } from '@/icons'
import * as Style from './SkillInput.style'

interface IlinksProps {
  links: ILink[] | undefined
}
interface ILink {
  link: string
  name: string
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
    <Stack
      sx={{
        gridArea: 'linksViewer',
        width: '100%',
        height: '100%',
        gap: '0.75rem',
      }}
    >
      <Stack>
        <LabelWithIcon
          svgIcon={<TagIcon sx={Style.IconStyle} />}
          message="링크모음"
          color="text.alternative"
        />
      </Stack>
      <Stack>
        {links?.map((link: ILink) => {
          return (
            <>
              <Typography
                key={crypto.randomUUID()}
                component="a"
                color={'text.normal'}
                variant="Body2"
                href={convertLink(link.link)}
                target="_blank"
                rel="noreferrer"
              >
                {link.name}
              </Typography>
            </>
          )
        })}
      </Stack>
    </Stack>
  )
}

export default LinksViewer
