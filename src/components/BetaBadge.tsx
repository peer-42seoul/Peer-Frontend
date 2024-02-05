import { Card, SxProps, Typography, createSvgIcon } from '@mui/material'

const BetaIcon = createSvgIcon(
  <svg
    width="258"
    height="128"
    viewBox="0 0 258 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_3_52)">
      <rect x="4" width="250" height="120" rx="12" fill="#EB4034" />
    </g>
    <g filter="url(#filter1_d_3_52)">
      <path
        d="M63.8082 59.1V55.81H71.7182C73.3515 55.81 74.8215 55.53 76.1282 54.97C77.4348 54.41 78.4615 53.5933 79.2082 52.52C79.9548 51.4467 80.3282 50.14 80.3282 48.6C80.3282 46.2667 79.5115 44.47 77.8782 43.21C76.2448 41.9033 74.1915 41.25 71.7182 41.25H65.0682V79.75H72.4182C74.5182 79.75 76.3615 79.3767 77.9482 78.63C79.5815 77.8833 80.8415 76.81 81.7282 75.41C82.6615 74.01 83.1282 72.3067 83.1282 70.3C83.1282 68.8067 82.8715 67.4767 82.3582 66.31C81.8448 65.1433 81.0982 64.1633 80.1182 63.37C79.1848 62.5767 78.0648 61.9933 76.7582 61.62C75.4515 61.2 74.0048 60.99 72.4182 60.99H63.8082V57.7H72.4182C74.7982 57.7 76.9915 57.9567 78.9982 58.47C81.0048 58.9833 82.7548 59.7767 84.2482 60.85C85.7882 61.8767 86.9782 63.2067 87.8182 64.84C88.6582 66.4733 89.0782 68.41 89.0782 70.65C89.0782 73.87 88.3315 76.5533 86.8382 78.7C85.3915 80.8 83.4082 82.3867 80.8882 83.46C78.4148 84.4867 75.5915 85 72.4182 85H59.1182V36H71.7182C74.6582 36 77.2015 36.4433 79.3482 37.33C81.5415 38.2167 83.2448 39.57 84.4582 41.39C85.6715 43.1633 86.2782 45.45 86.2782 48.25C86.2782 50.5367 85.6715 52.4967 84.4582 54.13C83.2448 55.7633 81.5415 57 79.3482 57.84C77.2015 58.68 74.6582 59.1 71.7182 59.1H63.8082ZM101.441 85V79.4H126.151V85H101.441ZM101.441 41.6V36H126.151V41.6H101.441ZM101.441 61.2V55.6H124.751V61.2H101.441ZM98.1514 36H104.101V85H98.1514V36ZM131.738 41.6V36H162.888V41.6H150.288V85H144.338V41.6H131.738ZM166.894 70.3L168.994 64.7H190.694L192.794 70.3H166.894ZM179.704 47.06L171.444 66.52L170.884 67.78L163.604 85H156.954L179.704 33.55L202.454 85H195.804L188.664 68.2L188.104 66.8L179.704 47.06Z"
        fill="black"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_3_52"
        x="0"
        y="0"
        width="258"
        height="128"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_3_52"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_3_52"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d_3_52"
        x="55.1182"
        y="33.55"
        width="151.336"
        height="59.45"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_3_52"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_3_52"
          result="shape"
        />
      </filter>
    </defs>
  </svg>,
  'BetaIcon',
)

const BetaBadge = ({ sx }: { sx?: SxProps }) => {
  return (
    <Card
      sx={{
        padding: '0.2rem',
        background: 'linear-gradient(to right bottom, orange , magenta)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...sx,
      }}
    >
      <Typography
        fontSize={'small'}
        fontWeight={'bold'}
        textAlign={'center'}
        color={'white'}
      >
        BETA
      </Typography>
    </Card>
  )
}

export { BetaBadge, BetaIcon }
