import { Button, ButtonProps, CircularProgress } from '@mui/material'
import React from 'react'

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean
  children?: React.ReactNode
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      startIcon={isLoading ? <CircularProgress size={'small'} /> : null}
    >
      {children}
    </Button>
  )
}

export default LoadingButton
