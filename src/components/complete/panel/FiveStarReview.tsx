'use client'

import { Rating } from '@mui/material'
import { useState } from 'react'
import StarIcon from '@mui/icons-material/Star'

// interface FiveStarReviewProps {

// }

const FiveStarReview = () => {
  const [value, setValue] = useState<number | null>(0)

  return (
    <Rating
      name="simple-controlled"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      emptyIcon={
        <StarIcon
          style={{ color: 'white', opacity: 0.28 }}
          fontSize="inherit"
        />
      }
      defaultValue={2.5}
      precision={0.5}
      size="large"
    />
  )
}

export default FiveStarReview
