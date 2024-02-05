'use client'

import React from 'react'
import { FormControlLabel, Stack, Typography } from '@mui/material'
import CuTypeToggle from '@/components/CuTypeToggle'
import Interest from './Interest'
import * as cardStyle from './HitchhikingCard.style'
import * as containerStyle from './CardContainer.style'
import CardStack from './CardStack'
import { IPostCardHitchhiking } from '@/types/IPostCard'
import { BetaIcon } from '@/components/BetaBadge'

const CardContainer = ({
  cardList,
  removeCard,
  isProject,
  message,
  handleChange,
}: {
  cardList: Array<IPostCardHitchhiking>
  removeCard: (recruit_id: number) => void
  isProject: boolean
  message: string
  handleChange: any
}) => {
  return (
    <Stack
      justifyContent={'flex-start'}
      alignItems={'center'}
      sx={containerStyle.cardContainerStyle}
      direction={'column'}
    >
      <Stack
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        spacing={'0.25rem'}
        sx={containerStyle.gnbContainerStyle}
      >
        <Typography component={'h4'} sx={containerStyle.gnbTypographyStyle}>
          히치하이킹
        </Typography>
        <BetaIcon />
      </Stack>
      <Stack
        sx={containerStyle.toggleContainerStyle}
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
          ...cardStyle.cardSize,
          mb: '0.875rem',
          position: 'relative',
          zIndex: 100,
        }}
      >
        {!message ? (
          <CardStack
            cardList={cardList}
            removeCard={removeCard}
            isProject={isProject}
          />
        ) : (
          <Typography variant="CaptionEmphasis">{message}</Typography>
        )}
      </Stack>
      <Interest id={cardList[cardList.length - 1]?.recruitId} />
    </Stack>
  )
}

export default CardContainer
