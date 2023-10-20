import { Box, Link, Typography } from '@mui/material'
import React from 'react'
import { IUserProfileLink } from '@/types/IUserProfile'

const ProfileLink = (props: IUserProfileLink) => {
  return (
    <Box>
      <Box
        key={props.linkUrl}
        component="img"
        src={`https://www.google.com/s2/favicons?domain=${props.linkUrl}`}
      />
      <Link href={props.linkUrl}>{props.linkName}</Link>
    </Box>
  )
}

const ProfileLinksSection = ({
  linkList,
}: {
  linkList: Array<IUserProfileLink>
}) => {
  return (
    <div>
      {linkList?.length ? (
        linkList.map((item) => <ProfileLink key={item.id} {...item} />)
      ) : (
        <Typography>제공된 링크가 없습니다.</Typography>
      )}
    </div>
  )
}

export default ProfileLinksSection
