import { IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import LabelWithIcon from '../LabelWithIcon'
import LinkIcon from '@/icons/LinkIcon'
import * as Style from './SkillInput.style'
import PlusIcon from '@/icons/PlusIcon'

interface ILinkInputValues {
  name: string
  link: string
  id: number
}

interface ILinkFormProps {
  links: ILinkInputValues[]
  addLink: (linkName: string, linkUrl: string) => void
  isValid: boolean
  setIsValid: (isValid: boolean) => void
  changeLinkName: (id: number, content: string) => void
  changeUrl: (id: number, content: string) => void
}

const LinkForm = ({
  links,
  addLink,
  // isValid,
  setIsValid,
  changeLinkName,
  changeUrl,
}: ILinkFormProps) => {
  const [checker, setChecker] = useState<boolean>(true)
  const validateUrl = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const completedUrl = e.target.value
    const regex =
      // eslint-disable-next-line no-useless-escape
      /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)/ // eslint-disable-next-line no-useless-escape
    setChecker(regex.test(completedUrl))
    alert(regex.test(completedUrl))
    setIsValid(checker)
    alert(`체크함  checker : ${checker}}`)
  }

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
      {links.map((link, index) => (
        <Stack key={index} direction={'row'} spacing={'0.5rem'}>
          <TextField
            key={index}
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
            onBlur={(e) => validateUrl(e)}
          />
        </Stack>
      ))}
      {!checker && (
        <Typography color="error">
          유효하지 않는 URL이 포함되어 있습니다.
        </Typography>
      )}
    </Stack>
  )
}

export default LinkForm
