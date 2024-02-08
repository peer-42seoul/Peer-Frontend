import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import { IUserProfileLink } from '@/types/IUserProfile'
import ProfileSection from './ProfileSection'
import Link from 'next/link'
import { useTheme } from '@mui/material'
import * as style from './Profile.style'

const ProfileLink = (props: IUserProfileLink) => {
  const theme = useTheme()
  return (
    <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
      <Avatar
        key={props.linkUrl}
        src={`https://www.google.com/s2/favicons?domain=${props.linkUrl}`}
        sx={style.faviconStyle}
        variant="square"
      >
        {props.linkName[0]}
      </Avatar>
      <Link
        href={
          props.linkUrl.startsWith('http://') ||
          props.linkUrl.startsWith('https://')
            ? props.linkUrl
            : `//${props.linkUrl}`
        }
        style={{
          textDecorationColor: theme.palette.text.normal,
        }}
      >
        <Typography variant={'Caption'} color={'text.strong'}>
          {props.linkName}
        </Typography>
      </Link>
    </Stack>
  )
}

const ProfileLinksSection = ({
  linkList,
  setModalType,
  isEditable,
}: {
  linkList: Array<IUserProfileLink>
  setModalType: (type: string) => void
  isEditable: boolean
}) => {
  const newLinkList: Array<{ linkName: string; linkUrl: string }> = []

  linkList.map((item) => {
    if (item.linkName === '' || item.linkUrl === '') {
      return
    }
    newLinkList.push({ linkName: item.linkName, linkUrl: item.linkUrl })
  })
  return (
    <Stack spacing={1}>
      <ProfileSection
        sectionTitle="links"
        setModalType={setModalType}
        titleTypographyProps={{
          color: 'text.strong',
          variant: 'CaptionEmphasis',
        }}
        isEditable={isEditable}
      />
      <Stack spacing={0.25}>
        {newLinkList?.length ? (
          newLinkList.map((item) => (
            <ProfileLink key={crypto.randomUUID()} {...item} />
          ))
        ) : (
          <Typography variant={'Caption'} color={'text.alternative'}>
            제공된 링크가 없습니다.
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default ProfileLinksSection
