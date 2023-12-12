'use client'

import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import useMedia from '@/hook/useMedia'
import { motion, AnimatePresence } from 'framer-motion'
import ShowcaseCard from './ShowcaseCard'
import { ICardData } from '../panel/types'

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
  cardList: Array<ICardData>
  isLoading: boolean
  update: () => void
  setCardList: (
    cardList: ICardData[] | ((prev: ICardData[]) => ICardData[]),
  ) => void
}) => {
  const { isPc } = useMedia()
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

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
      setDragStart({ x: 0, y: 0 })
      return
    }
    setDragStart({ x: 0, y: 0 })
    // setCurrentIndex((prev) => prev - 1)
    setCardList((prev: ICardData[]) => {
      console.log(`dislike api 호출 pathValue: ${recruit_id}, title: ${title}`)
      return prev.filter((card) => card.id !== recruit_id)
    })
    if (cardList.length === 2) {
      update()
    }
  }

  return (
    <>
      <Box width={1} height={1} position={'relative'} sx={{ zIndex: 500 }}>
        <AnimatePresence>
          {cardList.map((card) => (
            <motion.div
              key={card.id}
              initial={{
                scale: 1,
                opacity: 1,
              }}
              animate={{
                scale: 1,
                opacity: 1,
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
              onDragStart={(e, info) => {
                setDragStart({ x: info.point.x, y: info.point.y })
              }}
              onDragEnd={(e: any, info: any) =>
                handleDragEnd(e, info, card.id, card.name)
              }
            >
              <ShowcaseCard
                id={card.id}
                name={card.name}
                image={card.image}
                description={card.description}
                skill={card.skill}
                like={card.like}
                liked={card.liked}
                favorite={card.favorite}
                teamLogo={card.teamLogo}
                start={card.start}
                end={card.end}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>

      <Typography sx={{ zIndex: 0 }}>쇼케이스 끝!</Typography>
    </>
  )
}

export default CardContainer
