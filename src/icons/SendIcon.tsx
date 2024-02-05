'use client'
import { SvgIcon, SvgIconProps } from '@mui/material'

const SendIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M18.3346 1.66406L9.16797 10.8307"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.3346 1.66406L12.5013 18.3307L9.16797 10.8307L1.66797 7.4974L18.3346 1.66406Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  )
}

export default SendIcon
