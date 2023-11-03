'use client'
import React from 'react'
import { SWRConfig } from 'swr'

const CuSWRConfig = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        onError: (error) => {
          if (error.status !== 401) {
            return
          }
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default CuSWRConfig
