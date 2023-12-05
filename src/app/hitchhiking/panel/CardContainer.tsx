'use client'

import { IMainCard } from '@/types/IPostDetail'
import { Typography } from '@mui/material'
import React, { useMemo, useRef, useState } from 'react'
import PostCard from '@/components/PostCard'
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

  return (
    <>
      {currentIndex >= 0 ? (
        cardList.reverse().map((card, i) => (
          <PostCard
            key={card.recruit_id}
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
              borderRadius: '0.75rem',
              borderWidth: '2px',
              borderColor: 'line.base',
              borderStyle: 'solid',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: i + 1000,
            }}
          />
        ))
      ) : (
        <Typography>히치하이킹 끝!</Typography>
      )}
    </>
  )
}

export default CardContainer
