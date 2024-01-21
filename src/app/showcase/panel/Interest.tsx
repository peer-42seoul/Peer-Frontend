import { Stack, Typography, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useAxiosWithAuth from '@/api/config'
import Favorite from '@mui/icons-material/Favorite'
import { motion, useAnimationControls } from 'framer-motion'

const Interest = ({ id }: { id?: number }) => {
  const [favorite, setFavorite] = useState(false)
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
    try {
      await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/favorite/${id}`,
      )
      setFavorite((prev) => {
        if (!prev) control.start(variants.favorite)
        else control.start(variants.unfavorite)
        return !prev
      })
    } catch (e) {
      console.log('error', e)
      // TODO: error handling
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
      sx={{ p: '1rem 0 1.5rem 0', width: '100%' }}
    >
      <IconButton
        aria-label="add to favorites"
        onClick={changeFavorite}
        disableRipple
        sx={{
          backgroundColor: 'background.tertiary',
          borderRadius: '20px',
          padding: '8px',
          width: '40px',
          height: '40px',
          position: 'relative',
        }}
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
              color: favorite ? 'purple.strong' : 'purple.tinted',
              transition: 'color 0.1s linear',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
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
