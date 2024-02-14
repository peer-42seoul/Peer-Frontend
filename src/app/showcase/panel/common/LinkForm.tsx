import { IconButton, Stack, TextField } from '@mui/material'
import React from 'react'
import LabelWithIcon from '../../../../components/LabelWithIcon'
import LinkIcon from '@/icons/LinkIcon'
import * as Style from './SkillInput.style'
import PlusIcon from '@/icons/PlusIcon'
import { ILinkInformation } from '@/types/IShowcaseEdit'
import { TrashIcon } from '@/icons'

interface ILinkFormProps {
  links: ILinkInformation[]
  addLink: (linkName: string, linkUrl: string, id: string) => void
  deleteLink: (id: string) => void
  changeLinkName: (id: string, content: string) => void
  changeUrl: (id: string, content: string) => void
}

const LinkForm = ({
  links,
  addLink,
  deleteLink,
  changeLinkName,
  changeUrl,
}: ILinkFormProps) => {
  return (
    <Stack width={'100%'} spacing={'0.5rem'}>
      <Stack
        direction={'row'}
        spacing={'0.5rem'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <LabelWithIcon
          svgIcon={<LinkIcon sx={Style.IconStyle} />}
          message={'링크모음'}
        />
        <IconButton
          onClick={() => {
            if (links.length >= 5) return
            addLink('', '', crypto.randomUUID())
          }}
        >
          <PlusIcon sx={Style.IconStyle} />
        </IconButton>
      </Stack>
      {links.map((link, index) => (
        <Stack key={index} direction={'row'} spacing={'0.5rem'}>
          <TextField
            name="name"
            placeholder={'링크 이름'}
            sx={{ width: '12.8rem', height: '2rem' }}
            value={link.name}
            onChange={(e) => changeLinkName(link.id, e.target.value)}
          />
          <TextField
            name="url"
            placeholder={'링크 주소'}
            sx={{ width: '12.8rem', height: '2rem' }}
            autoComplete="off"
            value={link.link}
            onChange={(e) => changeUrl(link.id, e.target.value)}
          />
          <IconButton
            onClick={() => {
              deleteLink(link.id)
            }}
          >
            <TrashIcon sx={Style.IconStyle} />
          </IconButton>
        </Stack>
      ))}
    </Stack>
  )
}

export default LinkForm
