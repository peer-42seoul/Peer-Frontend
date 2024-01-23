import React from 'react'
import ContentSection from './ContentSection'
import IntersectionSection from './IntersectionSection'

const CreateShowcasePage = ({
  isPublished,
  showcaseId,
}: {
  isPublished: boolean
  showcaseId: number
}) => {
  return (
    <>
      <ContentSection isPublished={isPublished} />
      <IntersectionSection isPublished={isPublished} showcaseId={showcaseId} />
    </>
  )
}

export default CreateShowcasePage
