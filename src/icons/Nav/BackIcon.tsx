import { createSvgIcon } from '@mui/material'

const BackIcon = createSvgIcon(
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="chevron-left">
      <path
        id="Vector"
        d="M12.5 15L7.5 10L12.5 5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>,
  'BackIcon',
)

export default BackIcon
