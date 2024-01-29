import { createSvgIcon } from '@mui/material'

const CheckBoxSelected = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <rect
      x="5.625"
      y="5.625"
      width="12.75"
      height="12.75"
      rx="1.375"
      stroke="#currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M8 12.2727L9.76285 14.1958C10.1592 14.6282 10.8408 14.6282 11.2372 14.1958L16 9"
      stroke="#currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>,
  'CheckBoxSelected',
)

export default CheckBoxSelected
