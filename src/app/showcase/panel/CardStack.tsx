'use client'

import { Box } from '@mui/material'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as style from './ShowcaseCard.style'
import { ICardData } from '@/app/showcase/panel/types'
import { ShowcaseCard } from './ShowcaseCard'

enum ESwipeDirection {
  left = 'left',
  right = 'right',
  up = 'up',
  down = 'down',
}

const CardStack = ({
  cardList,
  removeCard,
  addCard,
}: {
  cardList: Array<ICardData>
  removeCard: (recruit_id: number) => void
  addCard?: () => void
}) => {
  const [dragged, setDragged] = useState(false)

  const checkDragDirection = (x: number, y: number) => {
    return y < 0 ? ESwipeDirection.up : ESwipeDirection.down
  }

  const handleDragEnd = (e: any, info: any, recruit_id: number) => {
    // 위로 조금만 움직였을 때 카드가 사라지지 않도록 처리
    if (
      Math.abs(info.offset.y) < 100 ||
      checkDragDirection(info.offset.x, info.offset.y) !== ESwipeDirection.up
    ) {
      setDragged(false)
      if (addCard) {
        addCard()
      }
      return
    }
    removeCard(recruit_id)
    // TODO: backend api 연결 시 콘솔 삭제 및 api 호출

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
                key={card.id}
                initial={{
                  scale: 0.8,
                  opacity: 0,
                  ...(card.hasBeenRemoved && {
                    y: -500,
                  }),
                }}
                animate={{
                  scale: i === cardList.length - 1 ? 1 : 0.8,
                  opacity: i === cardList.length - 1 ? 1 : 0,
                  y: 0,
                }}
                exit={{ opacity: 0, y: -500 }}
                drag
                dragSnapToOrigin
                dragElastic={0.5}
                dragConstraints={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
                dragTransition={{ bounceStiffness: 250, bounceDamping: 50 }}
                onDragStart={() => setDragged(true)}
                onDragEnd={(e: any, info: any) =>
                  handleDragEnd(e, info, card.id)
                }
                transition={{ duration: 0.3 }}
              >
                <ShowcaseCard
                  data={card}
                  dragged={dragged}
                  setDragged={setDragged}
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
