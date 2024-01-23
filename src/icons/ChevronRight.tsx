import { SvgIcon, SvgIconProps } from '@mui/material'

const ChevronRight = (props: SvgIconProps) => {
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
          d="M8 15L13 10L8 5"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  )
}

export default ChevronRight
