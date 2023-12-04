'use client'

import { IMainCard } from '@/types/IPostDetail'
import { Typography } from '@mui/material'
import React, { useMemo, useRef, useState } from 'react'
import TinderCard from 'react-tinder-card'
import './CardContainer.css'
import PostCard from '@/app/panel/PostCard'
import useMedia from '@/hook/useMedia'

type TSwipeDirection = 'left' | 'right' | 'up' | 'down'

const CardContainer = ({
  cardList,
  update,
}: {
  cardList: Array<IMainCard>
  isLoading: boolean
  update: () => void
}) => {
  const { isPc } = useMedia()
  const [currentIndex, setCurrentIndex] = useState<number>(cardList.length - 1)

  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(() => {
    return Array(cardList.length)
      .fill(0)
      .map(() => React.createRef<any>())
  }, [cardList.length])

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const swiped = (direction: TSwipeDirection, index: number) => {
    updateCurrentIndex(index - 1)
    if (index === 0) {
      update()
    }
  }

  const outOfFrame = (idx: number) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
  }

  return (
    <>
      {currentIndex >= 0 ? (
        cardList.map((card, i) => (
          <TinderCard
            key={card.recruit_id}
            ref={childRefs[i]}
            onSwipe={(dir) => swiped(dir, i)}
            onCardLeftScreen={() => outOfFrame(i)}
            preventSwipe={['right', 'left', 'down']}
            className="swipe"
          >
            <PostCard
              authorImage={card.user_thumbnail}
              teamName={card.user_nickname}
              title={card.title}
              tagList={card.tagList}
              image={card.image}
              postId={card.recruit_id}
              sx={{
                backgroundColor: 'background.primary',
                width: isPc ? '20.5rem' : '90vw',
                height: '27rem',
                maxWidth: '20.5rem',
                // maxHeight: '27rem',
                borderRadius: '0.75rem',
                borderWidth: '0.0625rem',
                borderColor: 'line.base',
                borderStyle: 'solid',
              }}
            />
          </TinderCard>
        ))
      ) : (
        <Typography>히치하이킹 끝!</Typography>
      )}
    </>
  )
}

export default CardContainer
