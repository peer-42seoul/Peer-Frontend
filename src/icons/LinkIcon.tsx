import { createSvgIcon } from '@mui/material'
import React from 'react'

const LinkIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <g clipPath="url(#clip0_3585_14274)">
      <g filter="url(#filter0_d_3585_14274)">
        <path
          d="M9.90909 5H11.8182C12.236 5 12.6498 5.0776 13.0358 5.22836C13.4218 5.37913 13.7726 5.6001 14.0681 5.87868C14.3635 6.15726 14.5979 6.48797 14.7578 6.85195C14.9177 7.21593 15 7.60603 15 8C15 8.39397 14.9177 8.78407 14.7578 9.14805C14.5979 9.51203 14.3635 9.84274 14.0681 10.1213C13.7726 10.3999 13.4218 10.6209 13.0358 10.7716C12.6498 10.9224 12.236 11 11.8182 11H9.90909M6.09091 11H4.18182C3.76398 11 3.35022 10.9224 2.96419 10.7716C2.57815 10.6209 2.22739 10.3999 1.93193 10.1213C1.33523 9.55871 1 8.79565 1 8C1 7.20435 1.33523 6.44129 1.93193 5.87868C2.52864 5.31607 3.33795 5 4.18182 5H6.09091"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          shapeRendering="crispEdges"
        />
      </g>
      <path
        d="M4.66797 8H11.3346"
        stroke="white"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_3585_14274"
        x="-3.75"
        y="4.25"
        width="23.5"
        height="15.5"
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
          result="effect1_dropShadow_3585_14274"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_3585_14274"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_3585_14274">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>,
  'LinkIcon',
)

export default LinkIcon
