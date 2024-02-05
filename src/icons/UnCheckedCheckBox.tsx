import React from 'react'
import { createSvgIcon } from '@mui/material'

const UnCheckedCheckBox = createSvgIcon(
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="0.5"
      width="13"
      height="13"
      rx="1.5"
      stroke="currentColor"
    />
  </svg>,
  'UnCheckedCheckBox',
)

export default UnCheckedCheckBox
