import React from 'react'
import './template.style.css'

const Template = ({ children }: { children: React.ReactNode }) => {
  return <div className="layout-container">{children}</div>
}

export default Template
