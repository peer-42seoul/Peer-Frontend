import React from 'react'
import ContentSection from './ContentSection'
import IntersectionSection from './IntersectionSection'

const CreateShowcasePage = ({
  isPublished,
  isPublic,
  showcaseId,
  teamId,
}: {
  isPublished: boolean
  isPublic: boolean
  showcaseId: number
  teamId: number
}) => {
  return (
    <>
      <ContentSection isPublished={isPublished} />
      <IntersectionSection
        isPublished={isPublished}
        isPublic={isPublic}
        showcaseId={showcaseId}
        teamId={teamId}
      />
    </>
  )
}

export default CreateShowcasePage
