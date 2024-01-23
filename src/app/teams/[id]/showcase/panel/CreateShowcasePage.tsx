import React from 'react'
import ContentSection from './ContentSection'
import IntersectionSection from './IntersectionSection'

const CreateShowcasePage = ({
  isShowcaseComplete,
}: {
  isShowcaseComplete: boolean
}) => {
  return (
    <>
      <ContentSection isShowcaseComplete={isShowcaseComplete} />
      <IntersectionSection isShowcaseComplete={isShowcaseComplete} />
    </>
  )
}

export default CreateShowcasePage
