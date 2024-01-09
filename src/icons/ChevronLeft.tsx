'use client'
import { SvgIcon, SvgIconProps } from '@mui/material'

const ChevronLeft = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M13 15L8 10L13 5"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  )
}

export default ChevronLeft
