'use client'
import { useState, TouchEvent, ReactNode, useEffect } from 'react'
import { Box } from '@mui/material'

const initialTouchState = {
  x: 0,
  y: 0,
}

interface ISwappableComponentProps {
  children: ReactNode
  gap: {
    x: number
    y: number
  }
  offset: {
    x: string
    y: string
  }
  eventHandler: () => void
}

const SwappableComponent = ({
  children,
  gap,
  offset,
  eventHandler,
}: ISwappableComponentProps) => {
  const [touchStart, setTouchStart] = useState(initialTouchState)
  const [touchEnd, setTouchEnd] = useState(initialTouchState)
  const [isSwapping, setIsSwapping] = useState(false)
  useEffect(() => {
    const { x: startX, y: startY } = touchStart
    const { x: endX, y: endY } = touchEnd
    if (gap.x && endX - startX < gap.x) {
      // 좌우 스와이프
      setIsSwapping(true)
    }
    if (gap.y && endY - startY < gap.y) {
      // 상하 스와이프 (현재는 안씀)
      setIsSwapping(true)
    }
  }, [touchStart, touchEnd])
  useEffect(() => {
    console.log('isSwapping', isSwapping)
  }, [isSwapping])

  const handleTouchStart = (e: TouchEvent) => {
    e.stopPropagation()
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }
  const handleTouchMove = (e: TouchEvent) => {
    e.stopPropagation()
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }
  const handleTouchEnd = (e: TouchEvent) => {
    e.stopPropagation()
    // 이벤트 발생조건 확인
    const { x: startX, y: startY } = touchStart
    const { x: endX, y: endY } = touchEnd
    if (gap.x && endX - startX <= gap.x) {
      // 좌우 스와이프 이벤트 트리거
      eventHandler()
    } else if (gap.y && endY - startY <= gap.y) {
      // 상하 스와이프 이벤트 트리거 (현재는 안씀)
      eventHandler()
    }
    setTouchStart(initialTouchState)
    setTouchEnd(initialTouchState)
    setIsSwapping(false)
  }

  return (
    <Box
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      sx={{
        display: 'flex',
        transition: 'transform 800ms',
        transform: isSwapping
          ? `translate(${offset.x}, ${offset.y})`
          : 'translate(0)',
      }}
    >
      {children}
    </Box>
  )
}

export default SwappableComponent
