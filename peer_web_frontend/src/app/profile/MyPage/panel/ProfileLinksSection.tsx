import { Box } from '@mui/material'
import React from 'react'

interface IProfileLinksSectionProps {
  link: string
  linkTitle?: string
}

const ProfileLinksSection = (props: Array<IProfileLinksSectionProps>) => {
  return (
    <div>
      {props?.length ? (
        props.map((item, i) => (
          <div key={item.link}>
            <Box
              key={item.link}
              component="img"
              src={`https://www.google.com/s2/favicons?domain=${item.link}`}
            />
            <a href={item.link}>link {i + 1}</a>
          </div>
        ))
      ) : (
        <p>제공된 링크가 없습니다.</p>
      )}
    </div>
  )
}

export default ProfileLinksSection
