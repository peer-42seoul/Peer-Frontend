import { SvgIcon, SvgIconProps } from '@mui/material'

const SirenIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: '#6F62FE' }}
      >
        <path
          d="M16.5 17.4V12C16.5 10.8065 16.0259 9.66193 15.182 8.81802C14.3381 7.97411 13.1935 7.5 12 7.5C10.8065 7.5 9.66193 7.97411 8.81802 8.81802C7.97411 9.66193 7.5 10.8065 7.5 12V17.4M16.5 17.4H7.5M16.5 17.4C16.9774 17.4 17.4352 17.5896 17.7728 17.9272C18.1104 18.2648 18.3 18.7226 18.3 19.2V21H5.7V19.2C5.7 18.7226 5.88964 18.2648 6.22721 17.9272C6.56477 17.5896 7.02261 17.4 7.5 17.4M20.1 12H21M17.85 5.25L17.4 5.7M3 12H3.9M12 3V3.9M5.6361 5.6361L6.2724 6.2724M12 12V17.4"
          stroke={'#6F62FE'}
          strokeOpacity="1"
          strokeWidth="1.50"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  )
}

export default SirenIcon
