import { Stack, Typography } from '@mui/material'

const SadDolphin = () => (
  <svg
    width="200"
    height="180"
    viewBox="0 0 311 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M70.4642 216.154C66.5332 202.44 67.7334 205.541 71.2589 191.251C83.5721 141.34 133.211 110.252 203.413 127.571C205.989 128.207 208.578 128.84 211.172 129.474C228.691 133.758 246.36 137.542 262.119 143.078C262.802 143.318 263.435 142.602 263.108 141.957C246.492 109.193 228.264 76.9204 192.183 68.0189C137.988 54.6488 82.1026 92.2584 67.3585 152.022C60.113 181.391 58.0511 192.408 70.4642 216.154Z"
      fill="#CDC8C8"
      fillOpacity="0.73"
    />
    <path
      d="M250.146 106.595C253.729 137.104 245.336 117.752 186.594 109.021C120.311 105.835 65.3937 143.308 135.038 74.494C139.054 58.2142 167.663 51.2715 198.937 58.9871C230.211 66.7026 251.349 88.3759 250.146 106.595Z"
      fill="#808080"
    />
    <path
      d="M135.641 29.2702C140.308 29.9051 144.617 32.1184 147.852 35.542L169.514 58.4691C174.514 63.7612 174.278 72.1049 168.986 77.1052V77.1052C163.693 82.1055 155.35 81.8688 150.35 76.5766L129.733 54.7569C125.862 50.6601 123.776 45.1944 123.932 39.5604L123.942 39.2021C124.113 33.0715 129.564 28.4434 135.641 29.2702V29.2702Z"
      fill="#808080"
    />
    <path
      d="M33.3481 211.046C34.5166 209.152 36.2482 207.663 38.3111 206.778L57.3692 198.598C60.7932 197.128 64.812 198.69 66.3454 202.086V202.086C67.8789 205.481 66.3462 209.426 62.9222 210.895L44.5311 218.789C42.0565 219.851 39.2666 219.999 36.6675 219.205L36.5171 219.159C33.0364 218.095 31.471 214.088 33.3481 211.046V211.046Z"
      fill="#808080"
    />
    <path
      d="M87.08 224.302C86.9263 222.082 86.0861 219.958 84.6717 218.215L71.6049 202.11C69.2574 199.216 64.9734 198.729 62.0365 201.022V201.022C59.0996 203.316 58.6218 207.52 60.9694 210.414L73.5788 225.955C75.2755 228.047 77.6767 229.475 80.3469 229.981L80.5014 230.01C84.0772 230.688 87.3268 227.868 87.08 224.302V224.302Z"
      fill="#808080"
    />
    <path
      d="M125.88 138.229C124.178 133.27 124.625 127.825 127.113 123.21L135.333 107.96C138.787 101.551 146.783 99.156 153.192 102.611V102.611C159.601 106.065 161.996 114.061 158.542 120.47L151.143 134.196C148.17 139.711 142.768 143.498 136.569 144.412L136.139 144.475C131.661 145.135 127.349 142.51 125.88 138.229V138.229Z"
      fill="#808080"
    />
    <path
      d="M261.748 143.078C261 142.699 260.284 142.261 259.606 141.769L232.806 122.308C230.205 120.42 227.272 119.039 224.16 118.237L190.956 109.685L185.354 108.824C178.858 107.824 175.161 100.848 177.982 94.9117V94.9117V94.9117C181.155 88.2323 188.995 85.1976 195.839 87.9999L242.902 107.272C247.089 108.986 250.746 111.781 253.5 115.371L268.506 134.933C272.021 139.515 266.899 145.687 261.748 143.078V143.078Z"
      fill="#808080"
    />
    <path
      d="M184.581 62.7244C196.315 87.4258 160.403 97.243 110.299 122.988C105.912 125.243 101.704 127.917 98.3276 131.513C62.7948 169.356 62.2791 258.639 60.3515 182.676C63.7964 123.335 85.3297 95.7993 109.699 74.7341C134.069 53.6689 170.407 51.2143 184.581 62.7244Z"
      fill="#808080"
    />
    <rect
      width="11.4036"
      height="3.04334"
      transform="matrix(0.00211316 0.999998 -0.999999 0.00153254 232.521 103)"
      fill="white"
    />
    <rect x="219" y="100" width="19" height="3" fill="white" />
    <rect
      width="11.4036"
      height="3.04334"
      transform="matrix(0.000648726 1 -1 0.000470479 227.043 103)"
      fill="white"
    />
  </svg>
)

interface IProps {
  message: string
  backgroundColor?: string
}

const NoDataDolphin = ({
  message,
  backgroundColor = 'background.secondary',
}: IProps) => {
  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      height={'20rem'}
      sx={{ backgroundColor: backgroundColor, borderRadius: '1rem' }}
    >
      <SadDolphin />
      <Typography p={'1rem'}>{message}</Typography>
    </Stack>
  )
}

export default NoDataDolphin
