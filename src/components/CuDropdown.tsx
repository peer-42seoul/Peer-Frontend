'use client'
// TODO : 사용하고 있는 페이지가 없는 컴포넌트임. 확인 후 삭제하면 좋을 듯.
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
