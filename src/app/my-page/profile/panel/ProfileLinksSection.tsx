import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import { IUserProfileLink } from '@/types/IUserProfile'
import ProfileSection from './ProfileSection'
import Link from 'next/link'
import { useTheme } from '@mui/material'
import * as style from './Profile.style'

const ProfileLink = (props: IUserProfileLink) => {
  console.log(props.linkUrl)
  const theme = useTheme()
  return (
    <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
      <Avatar
        key={props.linkUrl}
        src={`https://www.google.com/s2/favicons?domain=${props.linkUrl}`}
        sx={style.faviconStyle}
        variant="square"
      />
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
}: {
  linkList: Array<IUserProfileLink>
  setModalType: (type: string) => void
}) => {
  return (
    <Stack spacing={1}>
      <ProfileSection
        sectionTitle="links"
        setModalType={setModalType}
        titleTypographyProps={{
          color: 'text.strong',
          variant: 'CaptionEmphasis',
        }}
      />
      <Stack spacing={0.25}>
        {linkList?.length ? (
          linkList.map((item) => <ProfileLink key={item.id} {...item} />)
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
