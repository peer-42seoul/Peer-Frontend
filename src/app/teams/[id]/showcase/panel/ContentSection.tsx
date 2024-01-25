import { Typography } from '@mui/material'
import React from 'react'

const ContentSection = ({ isPublished }: { isPublished: boolean }) => {
  const notExistenceMessage =
    '쇼케이스는 피어로그에 담에내지 못한 비하인드 스토리를 담는 기술 블로그입니다. PC버전에서 쇼케이스 글 작성하기 버튼을 클릭해 프로젝트를 뽐낼 수 있는 쇼케이스 글을 작성해보세요.'
  const existenceMessage =
    '쇼케이스는 피어로그에 담에내지 못한 비하인드 스토리를 담는 기술 블로그입니다. 쇼케이스 글을 완성했다면, 공개버튼을 클릭해 멋진 프로젝트를 자랑해보세요.'

  return (
    <Typography
      color={'noraml'}
      lineHeight={'1rem'}
      fontSize={'0.75rem'}
      fontWeight={'400'}
    >
      {isPublished ? existenceMessage : notExistenceMessage}
    </Typography>
  )
}

export default ContentSection
