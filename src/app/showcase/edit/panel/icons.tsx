import { createSvgIcon } from '@mui/material'
import React from 'react'

const ImageIcon = createSvgIcon(
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
    <path d="M12.6667 2H3.33333C2.59695 2 2 2.59695 2 3.33333V12.6667C2 13.403 2.59695 14 3.33333 14H12.6667C13.403 14 14 13.403 14 12.6667V3.33333C14 2.59695 13.403 2 12.6667 2Z" />
    <path d="M5.66797 6.66406C6.22025 6.66406 6.66797 6.21635 6.66797 5.66406C6.66797 5.11178 6.22025 4.66406 5.66797 4.66406C5.11568 4.66406 4.66797 5.11178 4.66797 5.66406C4.66797 6.21635 5.11568 6.66406 5.66797 6.66406Z" />
    <path d="M13.9987 9.9974L10.6654 6.66406L3.33203 13.9974" />
  </svg>,
  'ImageIcon',
)

const ListIcon = createSvgIcon(
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
    <path d="M5.33203 4H13.9987" />
    <path d="M5.33203 8H13.9987" />
    <path d="M5.33203 12H13.9987" />
    <path d="M2 4H2.00667" />
    <path d="M2 8H2.00667" />
    <path d="M2 12H2.00667" />
  </svg>,
  'ListIcon',
)

const TagIcon = createSvgIcon(
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
    <path d="M13.7254 8.9426L8.94536 13.7226C8.82153 13.8466 8.67448 13.9449 8.51262 14.012C8.35075 14.0791 8.17725 14.1137 8.00203 14.1137C7.82681 14.1137 7.65331 14.0791 7.49144 14.012C7.32958 13.9449 7.18253 13.8466 7.0587 13.7226L1.33203 8.0026V1.33594H7.9987L13.7254 7.0626C13.9737 7.31242 14.1131 7.65036 14.1131 8.0026C14.1131 8.35485 13.9737 8.69279 13.7254 8.9426Z" />
    <path d="M4.66797 4.66406H4.67464" />
  </svg>,
  'TagIcon',
)

const UserCheckIcon = createSvgIcon(
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
    <g clipPath="url(#clip0_3585_14241)">
      <path d="M10.668 14V12.6667C10.668 11.9594 10.387 11.2811 9.88692 10.781C9.38682 10.281 8.70855 10 8.0013 10H3.33464C2.62739 10 1.94911 10.281 1.44902 10.781C0.94892 11.2811 0.667969 11.9594 0.667969 12.6667V14" />
      <path d="M5.66667 7.33333C7.13943 7.33333 8.33333 6.13943 8.33333 4.66667C8.33333 3.19391 7.13943 2 5.66667 2C4.19391 2 3 3.19391 3 4.66667C3 6.13943 4.19391 7.33333 5.66667 7.33333Z" />
      <path d="M11.332 7.33333L12.6654 8.66667L15.332 6" />
    </g>
    <defs>
      <clipPath id="clip0_3585_14241">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>,
  'UserCheckIcon',
)

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

const FileIcon = createSvgIcon(
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
    <path d="M9.33464 1.33594H4.0013C3.64768 1.33594 3.30854 1.47641 3.05849 1.72646C2.80844 1.97651 2.66797 2.31565 2.66797 2.66927V13.3359C2.66797 13.6896 2.80844 14.0287 3.05849 14.2787C3.30854 14.5288 3.64768 14.6693 4.0013 14.6693H12.0013C12.3549 14.6693 12.6941 14.5288 12.9441 14.2787C13.1942 14.0287 13.3346 13.6896 13.3346 13.3359V5.33594L9.33464 1.33594Z" />
    <path d="M9.33203 1.33594V5.33594H13.332" />
    <path d="M10.6654 8.66406H5.33203" />
    <path d="M10.6654 11.3359H5.33203" />
    <path d="M6.66536 6H5.9987H5.33203" />
  </svg>,
  'FileIcon',
)

export { ImageIcon, ListIcon, TagIcon, UserCheckIcon, LinkIcon, FileIcon }
