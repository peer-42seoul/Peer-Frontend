'use client'

import { IMainCard } from '@/types/IPostDetail'
import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
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
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  console.log('cardList')
  console.log(cardList)

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

  const checkDragDirection = (x: number, y: number) => {
    if (Math.abs(dragStart.x - x) > Math.abs(dragStart.y - y)) {
      return dragStart.x - x > 0 ? ESwipeDirection.left : ESwipeDirection.right
    } else {
      return dragStart.y - y > 0 ? ESwipeDirection.up : ESwipeDirection.down
    }
  }

  const handleDragEnd = (
    e: any,
    info: any,
    recruit_id: number,
    title: string,
  ) => {
    // 위로 조금만 움직였을 때 카드가 사라지지 않도록 처리
    if (
      Math.abs(info.point.y - dragStart.y) < 150 ||
      checkDragDirection(info.point.x, info.point.y) !== ESwipeDirection.up
    ) {
      return
    }
    // setCurrentIndex((prev) => prev - 1)
    setCardList((prev: IMainCard[]) => {
      console.log(`dislike api 호출 pathValue: ${recruit_id}, title: ${title}`)
      return prev.filter((card) => card.recruit_id !== recruit_id)
    })
    if (cardList.length === 2) {
      update()
    }
  }

  return (
    <>
      <Box width={1} height={1} position={'relative'} sx={{ zIndex: 500 }}>
        <AnimatePresence>
          {cardList.map((card, i) => (
            <motion.div
              key={card.recruit_id}
              initial={{
                scale: 1,
                opacity: 0,
              }}
              animate={{ scale: 1, opacity: 1, zIndex: i + 1000 }}
              exit={{ opacity: 0 }}
              drag
              dragSnapToOrigin
              whileDrag={{ scale: 1.2 }}
              dragElastic={1}
              dragConstraints={{
                left: 0,
                right: 0,
                bottom: 0,
              }}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 15 }}
              onDragStart={(e, info) => {
                setDragStart({ x: info.point.x, y: info.point.y })
              }}
              onDragEnd={(e: any, info: any) =>
                handleDragEnd(e, info, card.recruit_id, card.title)
              }
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
          ))}
        </AnimatePresence>
      </Box>

      <Typography sx={{ zIndex: 0 }}>히치하이킹 끝!</Typography>
    </>
  )
}

export default CardContainer
