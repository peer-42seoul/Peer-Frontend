import { IconButton, Stack, TextField } from '@mui/material'
import React from 'react'
import LabelWithIcon from '../LabelWithIcon'
import LinkIcon from '@/icons/LinkIcon'
import * as Style from '../ShowcaseEditor.style'
import PlusIcon from '@/icons/PlusIcon'
interface ILinkInputValues {
  linkName: string
  linkUrl: string
  id: number
}

interface ILinkFormProps {
  links: ILinkInputValues[]
  addLink: (linkName: string, linkUrl: string) => void
  changeLinkName: (id: number, content: string) => void
  changeUrl: (id: number, content: string) => void
}

const LinkForm = ({
  links,
  addLink,
  changeLinkName,
  changeUrl,
}: ILinkFormProps) => {
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
            if (links.length >= 5) return
            addLink('', '')
          }}
        >
          <PlusIcon sx={Style.IconStyle} />
        </IconButton>
      </Stack>
      {links.map((link) => (
        <Stack key={link.id} direction={'row'} spacing={'0.5rem'}>
          <TextField
            key={link.id}
            name="linkName"
            placeholder={'링크 이름'}
            sx={{ width: '12.8rem', height: '2rem' }}
            value={link.linkName}
            onChange={(e) => changeLinkName(link.id, e.target.value)}
          />
          <TextField
            name="linkUrl"
            placeholder={'링크 주소'}
            sx={{ width: '12.8rem', height: '2rem' }}
            autoComplete="off"
            value={link.linkUrl}
            onChange={(e) => changeUrl(link.id, e.target.value)}
          />
        </Stack>
      ))}
    </Stack>
  )
}

export default LinkForm
