'use client'

import { IconButton, Stack } from '@mui/material'
import { ICardData } from '../types'
import PhoneFrame from '../PhoneFrame'
import ShowcasePcView from './ShowcasePcView'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useCallback, useState } from 'react'

interface ShowcasePcLayoutProps {
  cardList: ICardData[]
  page: number
  setPage: (page: number) => void
}

const ShowcasePCLayout = ({
  cardList,
  page,
  setPage,
}: ShowcasePcLayoutProps) => {
  const [index, setIndex] = useState(0)

  const handlePrevClick = () => {
    if (!cardList) return
    if (index > 0) {
      setIndex(index - 1)
    }
  }

  const handleNextClick = useCallback(() => {
    if (!cardList) return
    if (index < cardList.length - 1) {
      setIndex(index + 1)
      if (index === cardList.length - 3) {
        setPage(page + 1)
      }
    }
  }, [index, page, cardList, setPage])

  return (
    <>
      <Stack direction={'row'} spacing={2} height={'600px'}>
        <Stack direction={'row'} spacing={1}>
          <PhoneFrame
            imageUrl={cardList[index] ? cardList[index].image! : undefined}
          />
          <Stack direction={'column-reverse'}>
            <Stack>
              <IconButton
                onClick={handlePrevClick}
                disabled={index === 0 ? true : false}
              >
                <ExpandLessIcon color={index === 0 ? undefined : 'primary'} />
              </IconButton>
              <IconButton
                onClick={handleNextClick}
                disabled={cardList.length - 1 === index ? true : false}
              >
                <ExpandMoreIcon
                  color={cardList.length - 1 === index ? undefined : 'primary'}
                />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
        <ShowcasePcView data={cardList ? cardList[index] : undefined} />
      </Stack>
    </>
  )
}

export default ShowcasePCLayout
