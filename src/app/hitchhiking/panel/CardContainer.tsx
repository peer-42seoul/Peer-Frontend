import MainCard from '@/app/panel/main-page/MainCard'
import { IMainCard } from '@/types/IPostDetail'
import { Box, Container, Stack, Typography } from '@mui/material'
import React, { useMemo, useRef, useState } from 'react'
import TinderCard from 'react-tinder-card'
import './CardContainer.css'

type TSwipeDirection = 'left' | 'right' | 'up' | 'down'

const CardContainer = ({
  cardList,
  isLoading,
  update,
}: {
  cardList: Array<IMainCard>
  isLoading: boolean
  update: () => void
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(cardList.length - 1)
  // const [lastDirection, setLastDirection] = useState<TSwipeDirection>(
  //   '' as TSwipeDirection,
  // )
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(() => {
    return Array(cardList.length)
      .fill(0)
      .map(() => React.createRef<any>())
  }, [cardList.length])

  // const canGoBack = currentIndex < cardList.length - 1

  // const canSwipe = currentIndex >= 0

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const swiped = (direction: TSwipeDirection, index: number) => {
    // setLastDirection(direction)
    updateCurrentIndex(index - 1)
    console.log('swiped', index)
    // if (index <= 0) {
    //   update()
    // }
  }

  const outOfFrame = (idx: number) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
  }

  // const swipe = async (dir: TSwipeDirection) => {
  //   if (canSwipe && currentIndex < cardList.length) {
  //     await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
  //   }
  // }

  // // increase current index and show card
  // const goBack = async () => {
  //   if (!canGoBack) return
  //   const newIndex = currentIndex + 1
  //   updateCurrentIndex(newIndex)
  //   await childRefs[newIndex].current.restoreCard()
  // }

  return (
    <Container sx={{ width: '100% ', height: '100%', overflow: 'hidden' }}>
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        sx={{ width: '90vw', maxWidth: '100%', height: '100%' }}
      >
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
              <Box
                sx={{
                  position: 'relative',
                  width: '80vw',
                  maxWidth: '260px',
                  height: '300px',
                }}
              >
                <MainCard {...card} type="STUDY" />
              </Box>
            </TinderCard>
          ))
        ) : (
          <Typography>히치하이킹 끝!</Typography>
        )}
      </Stack>
    </Container>
  )
}

export default CardContainer
