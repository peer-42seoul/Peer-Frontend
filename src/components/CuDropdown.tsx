'use client'

import { Dropdown, DropdownProps } from '@mui/base'
import React from 'react'

interface CuDropdownProps extends DropdownProps {
  children: React.ReactNode
  isOpen: boolean
}

const CuDropdown = (props: CuDropdownProps) => {
  const { children, isOpen } = props
  return <Dropdown open={isOpen}>{children}</Dropdown>
}

export default CuDropdown
