import { Box, Link, Skeleton, Typography } from '@mui/material'
import React from 'react'
import { IUserProfileLink } from '@/types/IUserProfile'

const ProfileLink = (props: IUserProfileLink) => {
  return (
    <>
      <Box
        key={props.link}
        component="img"
        src={`https://www.google.com/s2/favicons?domain=${props.link}`}
      />
      <Link href={props.link}>{props.linkTitle}</Link>
    </>
  )
}

const ProfileLinksSection = ({
  linkList,
  isLoading,
}: {
  linkList?: Array<IUserProfileLink>
  isLoading: boolean
}) => {
  return (
    <div>
      {isLoading ? (
        <Skeleton />
      ) : linkList?.length ? (
        linkList.map((item) => <ProfileLink key={item.link} {...item} />)
      ) : (
        <Typography>제공된 링크가 없습니다.</Typography>
      )}
    </div>
  )
}

export default ProfileLinksSection
