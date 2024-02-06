import { Stack, Typography, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useAxiosWithAuth from '@/api/config'
import Favorite from '@mui/icons-material/Favorite'
import { motion, useAnimationControls } from 'framer-motion'
import useToast from '@/states/useToast'
import * as style from './Interest.style'

const Interest = ({ id }: { id?: number }) => {
  const [favorite, setFavorite] = useState(false)

  const { openToast, closeToast } = useToast()

  const axiosInstance = useAxiosWithAuth()

  const control = useAnimationControls()

  const variants = {
    favorite: {
      scale: [1, 1.2, 1],
    },
    unfavorite: {
      scale: [1, 0.8, 1],
    },
  }

  const changeFavorite = async () => {
    if (!id) return
    closeToast()
    try {
      await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/recruit/favorite/${id}`,
      )
      setFavorite((prev) => {
        if (!prev) control.start(variants.favorite)
        else control.start(variants.unfavorite)
        return !prev
      })
    } catch (e) {
      openToast({
        severity: 'error',
        message: '로그인이 필요한 서비스입니다.',
      })
    }
  }

  useEffect(() => {
    setFavorite(false)
  }, [id])

  return (
    <Stack
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      spacing={1}
      sx={{ p: '1rem 0 1.5rem 0', width: 'fit-content' }}
    >
      <IconButton
        aria-label="add to favorites"
        onClick={changeFavorite}
        disableRipple
        sx={style.iconButtonStyle}
      >
        <motion.div
          animate={control}
          variants={variants}
          transition={{
            duration: 0.2,
            ease: 'easeInOut',
          }}
        >
          <Favorite
            sx={{
              ...style.iconStyleBase,
              color: favorite ? 'purple.strong' : 'purple.tinted',
            }}
          />
        </motion.div>
      </IconButton>
      <Typography variant="Body1" color={'purple.alternative'}>
        관심있어요!
      </Typography>
    </Stack>
  )
}

export default Interest
