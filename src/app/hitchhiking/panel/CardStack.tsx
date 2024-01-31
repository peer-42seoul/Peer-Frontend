'use client'

import { Box } from '@mui/material'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HitchhikingCard from './HitchhikingCard'
import * as style from './HitchhikingCard.style'
import { IPostCardHitchhiking } from '@/types/IPostCard'

enum ESwipeDirection {
  left = 'left',
  right = 'right',
  up = 'up',
  down = 'down',
}

const CardStack = ({
  cardList,
  removeCard,
  isProject,
}: {
  cardList: Array<IPostCardHitchhiking>
  removeCard: (recruit_id: number) => void
  isProject: boolean
}) => {
  const [dragged, setDragged] = useState(false)

  const checkDragDirection = (x: number, y: number) => {
    if (Math.abs(x) > Math.abs(y)) {
      return x < 0 ? ESwipeDirection.left : ESwipeDirection.right
    } else {
      return y < 0 ? ESwipeDirection.up : ESwipeDirection.down
    }
  }

  const handleDragEnd = (e: any, info: any, recruit_id: number) => {
    // COMMENT : 위로 조금만 움직였을 때 카드가 사라지지 않도록 처리
    if (
      Math.abs(info.offset.y) < 150 ||
      checkDragDirection(info.offset.x, info.offset.y) !== ESwipeDirection.up
    ) {
      setDragged(false)

      return
    }
    removeCard(recruit_id)

    setDragged(false)
  }

  return (
    <>
      <Box position={'relative'} sx={style.cardSize}>
        <motion.div
          animate={{
            opacity: cardList.length > 1 ? 1 : 0,
            transform: cardList.length > 2 ? 'rotate(-2.5deg)' : 'rotate(0deg)',
            position: 'absolute',
          }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              ...style.cardSize,
              backgroundColor: 'text.assistive',
            }}
          />
        </motion.div>
        <motion.div
          animate={{
            opacity: cardList.length > 2 ? 1 : 0,
            transform: cardList.length > 3 ? 'rotate(2.5deg)' : 'rotate(0deg)',
            position: 'absolute',
          }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              ...style.cardSize,
              backgroundColor: 'text.assistive',
            }}
          />
        </motion.div>
        <AnimatePresence>
          {cardList.map((card, i) => {
            if (cardList.length > 2 && cardList.length - i > 2) return null
            return (
              <motion.div
                key={card.recruitId}
                initial={{
                  scale: 0.8,
                  opacity: 0,
                }}
                animate={{
                  scale: i === cardList.length - 1 ? 1 : 0.8,
                  opacity: i === cardList.length - 1 ? 1 : 0,
                }}
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
                dragTransition={{ bounceStiffness: 300, bounceDamping: 50 }}
                onDragStart={() => setDragged(true)}
                onDragEnd={(e: any, info: any) =>
                  handleDragEnd(e, info, card.recruitId)
                }
                transition={{ duration: 0.3 }}
              >
                <HitchhikingCard
                  authorImage={card.authorImage}
                  authorId={card.authorId}
                  teamName={card.teamName}
                  title={card.title}
                  tagList={card.tagList}
                  image={card.image}
                  postId={card.recruitId}
                  dragged={dragged}
                  setDragged={setDragged}
                  isProject={isProject}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </Box>
    </>
  )
}

export default CardStack
