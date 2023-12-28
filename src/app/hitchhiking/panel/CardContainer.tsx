'use client'

import { IMainCard } from '@/types/IPostDetail'
import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HitchhikingCard from './HitchhikingCard'
import { cardStyle } from './HitchhikingCard.style'

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
  isProject,
}: {
  cardList: Array<IMainCard>
  update: () => void
  setCardList: (
    cardList: IMainCard[] | ((prev: IMainCard[]) => IMainCard[]),
  ) => void
  isProject: boolean
}) => {
  const [dragged, setDragged] = useState(false)

  console.log('cardList')
  console.log(cardList)

  const checkDragDirection = (x: number, y: number) => {
    if (Math.abs(x) > Math.abs(y)) {
      return x < 0 ? ESwipeDirection.left : ESwipeDirection.right
    } else {
      return y < 0 ? ESwipeDirection.up : ESwipeDirection.down
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
      Math.abs(info.offset.y) < 150 ||
      checkDragDirection(info.offset.x, info.offset.y) !== ESwipeDirection.up
    ) {
      setDragged(false)

      return
    }

    setCardList((prev: IMainCard[]) => {
      console.log(`dislike api 호출 pathValue: ${recruit_id}, title: ${title}`)
      return prev.filter((card) => card.recruit_id !== recruit_id)
    })
    if (cardList.length === 2) {
      update()
    }
    setDragged(false)
  }

  return (
    <>
      <Box width={1} height={1} position={'relative'} sx={{ zIndex: 500 }}>
        <motion.div
          animate={{
            opacity: cardList.length > 2 ? 1 : 0,
            transform: cardList.length > 2 ? 'rotate(-2.5deg)' : 'rotate(0deg)',
            position: 'absolute',
            top: '0',
            left: '0',
          }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              ...cardStyle,
              backgroundColor: 'text.assistive',
              top: '0',
              left: '0',
              position: 'static',
            }}
          />
        </motion.div>
        <motion.div
          animate={{
            opacity: cardList.length > 3 ? 1 : 0,
            transform: cardList.length > 3 ? 'rotate(2.5deg)' : 'rotate(0deg)',
            position: 'absolute',
          }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              ...cardStyle,
              backgroundColor: 'text.assistive',
              position: 'static',
            }}
          />
        </motion.div>
        {cardList.length > 1 && (
          <>
            <AnimatePresence>
              {cardList.map((card, i) => {
                if (cardList.length - i > 2) return null
                return (
                  <motion.div
                    key={card.recruit_id}
                    initial={{
                      scale: 0.8,
                      opacity: 0,
                    }}
                    animate={{
                      scale: i === cardList.length - 1 ? 1 : 0.8,
                      opacity: i === cardList.length - 1 ? 1 : 0,
                    }}
                    style={{
                      display: i === cardList.length - 1 ? 'block' : 'none',
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
                    dragTransition={{ bounceStiffness: 300, bounceDamping: 15 }}
                    onDragStart={() => setDragged(true)}
                    onDragEnd={(e: any, info: any) =>
                      handleDragEnd(e, info, card.recruit_id, card.title)
                    }
                    transition={{ duration: 0.5 }}
                  >
                    <HitchhikingCard
                      authorImage={card.user_thumbnail}
                      teamName={card.user_nickname}
                      title={card.title}
                      tagList={card.tagList}
                      image={card.image}
                      postId={card.recruit_id}
                      sx={cardStyle}
                      dragged={dragged}
                      setDragged={setDragged}
                      isProject={isProject}
                    />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </>
        )}
      </Box>

      <Typography sx={{ zIndex: 0 }}>히치하이킹 끝!</Typography>
    </>
  )
}

export default CardContainer
