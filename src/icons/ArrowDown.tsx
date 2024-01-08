'use client'
import React from 'react'
import { createSvgIcon } from '@mui/material'

const ArrowDown = createSvgIcon(
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 4.16797V15.8346"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.8346 10L10.0013 15.8333L4.16797 10"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  'ArrowDown',
)

export default ArrowDown
