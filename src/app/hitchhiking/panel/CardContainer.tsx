'use client'
import React from 'react'
import useMedia from '@/hook/useMedia'
import { IMainCard } from '@/types/IPostDetail'
import { FormControlLabel, Stack, Typography } from '@mui/material'
import CuTypeToggle from '@/components/CuTypeToggle'
import Interest from './Interest'
import * as cardStyle from './HitchhikingCard.style'
import CardStack from './CardStack'

const CardContainer = ({
  cardList,
  removeCard,
  isProject,
  message,
  handleChange,
}: {
  cardList: Array<IMainCard>
  removeCard: (recruit_id: number) => void
  isProject: boolean
  message: string
  handleChange: any
}) => {
  const { isPc } = useMedia()
  return (
    <Stack
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{
        width: '100%',
        height: isPc ? '100%' : '80svh',
        overflow: 'hidden',
        bottom: 0,
      }}
      direction={'column'}
    >
      <Stack
        sx={{ width: '100%' }}
        justifyContent={'center'}
        alignItems={'center'}
        direction={'row'}
        spacing={'0.5rem'}
      >
        <Typography
          variant="Caption"
          color={!isProject ? 'purple.normal' : 'text.assistive'}
          sx={{ transition: 'color 0.5s ease' }}
        >
          스터디
        </Typography>
        <FormControlLabel
          control={<CuTypeToggle checked={isProject} onChange={handleChange} />}
          label={''}
        />
        <Typography
          variant="Caption"
          color={isProject ? 'purple.normal' : 'text.assistive'}
          sx={{ transition: 'color 0.5s ease' }}
        >
          프로젝트
        </Typography>
      </Stack>
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          ...(isPc ? cardStyle.cardPcSize : cardStyle.cardMobileSize),
          position: 'relative',
        }}
      >
        {!message ? (
          <CardStack
            cardList={cardList}
            removeCard={removeCard}
            isProject={isProject}
          />
        ) : (
          <Typography>{message}</Typography>
        )}
      </Stack>
      <Interest id={cardList[cardList.length - 1]?.recruit_id} />
    </Stack>
  )
}

export default CardContainer
