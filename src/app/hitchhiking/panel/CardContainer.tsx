'use client'

import { IMainCard } from '@/types/IPostDetail'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import PostCard from '@/components/PostCard'
import useMedia from '@/hook/useMedia'
import { motion, AnimatePresence } from 'framer-motion'

enum ESwipeDirection {
  left = 'left',
  right = 'right',
  up = 'up',
  down = 'down',
}

const CardContainer = ({
  cardList,
  update,
  setCardList,
}: {
  cardList: Array<IMainCard>
  isLoading: boolean
  update: () => void
  setCardList: (
    cardList: IMainCard[] | ((prev: IMainCard[]) => IMainCard[]),
  ) => void
}) => {
  const { isPc } = useMedia()
  const [currentIndex, setCurrentIndex] = useState<number>(cardList.length - 1)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setCurrentIndex(cardList.length - 1)
  }, [cardList])

  const cardStyle = {
    backgroundColor: 'background.primary',
    width: isPc ? '20.5rem' : '90vw',
    height: '27rem',
    maxWidth: '20.5rem',
    borderRadius: '0.75rem',
    borderWidth: '2px',
    borderColor: 'line.base',
    borderStyle: 'solid',
    position: 'absolute',
    top: 0,
    left: 0,
  }

  const cardTop = useRef<HTMLDivElement>(null)
  const isTop = (i: number) => i === currentIndex

  const checkDragDirection = (x: number, y: number) => {
    if (Math.abs(dragStart.x - x) > Math.abs(dragStart.y - y)) {
      return dragStart.x - x > 0 ? ESwipeDirection.left : ESwipeDirection.right
    } else {
      return dragStart.y - y > 0 ? ESwipeDirection.up : ESwipeDirection.down
    }
  }

  const handleDragEnd = (e: any, info: any) => {
    if (checkDragDirection(info.point.x, info.point.y) === ESwipeDirection.up) {
      console.log(
        `dislike api 호출 pathValue: ${cardList[currentIndex].recruit_id}`,
      )
      setCurrentIndex((prev) => prev - 1)
      setCardList((prev: IMainCard[]) => {
        prev.splice(-1)
        return prev
      })
      if (currentIndex === 2) {
        update()
      }
    }
  }

  return (
    <>
      <Box ref={cardTop} width={1} height={1} position={'relative'}>
        <AnimatePresence>
          {currentIndex >= 0 ? (
            cardList.map((card, i) => (
              <motion.div
                key={card.recruit_id}
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                drag={isTop(i)}
                whileDrag={{ scale: 1.2 }}
                style={{ zIndex: i + 1000 }}
                dragSnapToOrigin
                dragConstraints={isTop(i) ? cardTop : undefined}
                dragElastic={1}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 15 }}
                onDragStart={(e, info) => {
                  setDragStart({ x: info.point.x, y: info.point.y })
                }}
                onDragEnd={handleDragEnd}
              >
                <PostCard
                  authorImage={card.user_thumbnail}
                  teamName={card.user_nickname}
                  title={card.title}
                  tagList={card.tagList}
                  image={card.image}
                  postId={card.recruit_id}
                  sx={cardStyle}
                />
              </motion.div>
            ))
          ) : (
            <Typography>히치하이킹 끝!</Typography>
          )}
        </AnimatePresence>
      </Box>
    </>
  )
}

export default CardContainer
