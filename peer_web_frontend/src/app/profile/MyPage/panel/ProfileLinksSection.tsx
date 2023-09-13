import { Box, Link, Typography } from '@mui/material'
import React from 'react'

interface IProfileLinksSectionProps {
  link: string
  linkTitle?: string
}

const ProfileLink = (props: IProfileLinksSectionProps) => {
  return (
    <>
      <Box
        key={props.link}
        component="img"
        src={`https://www.google.com/s2/favicons?domain=${props.link}`}
      />
      <Link href={props.link}>link</Link>
    </>
  )
}

const ProfileLinksSection = (props: Array<IProfileLinksSectionProps>) => {
  return (
    <div>
      {props?.length ? (
        props.map((item) => <ProfileLink key={item.link} {...item} />)
      ) : (
        <Typography>제공된 링크가 없습니다.</Typography>
      )}
    </div>
  )
}

export default ProfileLinksSection
