import { Chip, Grid, SxProps, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './TagChip.css'
import useAxiosWithAuth from '@/api/config'
import useToast from '@/states/useToast'

interface IChip {
  key: number
  label: string
}

const TagChip = ({ chip, mutate }: { chip: IChip; mutate: () => void }) => {
  const [style, setStyle] = useState<SxProps>({} as SxProps)

  const { openToast, closeToast } = useToast()

  useEffect(() => {
    setStyle({
      animation: 'PopAnimation 0.5s',
    })
    // const id = setTimeout(() => {
    //   setStyle({
    //     opacity: 1,
    //     transform: 'scale(1)',
    //   })
    // }, 500)
    // return () => clearTimeout(id)
  }, [])

  const axiosWithAuth = useAxiosWithAuth()
  const handleDelete = async (chip: IChip) => {
    closeToast()
    await axiosWithAuth
      .delete(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/alarm/delete?keyword=${chip.label}`,
      )
      .then(() => {
        openToast({
          severity: 'success',
          message: `'${chip.label}'를 알림 키워드 목록에서 삭제했습니다.`,
        })
      })
      .then(() => {
        mutate()
      })
      .catch((error) => {
        if (error.data.message) {
          openToast({
            severity: 'error',
            message: error.data.message,
          })
        } else {
          openToast({
            severity: 'error',
            message: `'${chip.label}'를 알림 키워드 목록에서 삭제하지 못했습니다`,
          })
        }
      })
  }

  return (
    <Grid item xs={0}>
      <Chip
        label={
          <Typography variant="Tag" color={'purple.strong'} sx={{ padding: 0 }}>
            {chip.label}
          </Typography>
        }
        deleteIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{ right: 0, display: 'relative', margin: '0px' }}
          >
            <path
              d="M7.99939 8.73231C7.90288 8.6358 7.84866 8.5049 7.84866 8.36841C7.84866 8.23193 7.90288 8.10103 7.99939 8.00452C8.0959 7.90801 8.22679 7.85379 8.36328 7.85379C8.49977 7.85379 8.63067 7.90801 8.72718 8.00452L16.0051 15.2824C16.1016 15.3789 16.1558 15.5098 16.1558 15.6463C16.1558 15.7828 16.1016 15.9137 16.0051 16.0102C15.9086 16.1067 15.7777 16.1609 15.6412 16.1609C15.5047 16.1609 15.3738 16.1067 15.2773 16.0102L7.99939 8.73231Z"
              fill="#6F62FE"
            />
            <path
              d="M15.2728 8.00452C15.3693 7.90801 15.5002 7.85379 15.6367 7.85379C15.7732 7.85379 15.9041 7.90801 16.0006 8.00452C16.0971 8.10103 16.1513 8.23193 16.1513 8.36841C16.1513 8.5049 16.0971 8.6358 16.0006 8.73231L8.72272 16.0102C8.62621 16.1067 8.49531 16.1609 8.35882 16.1609C8.22234 16.1609 8.09144 16.1067 7.99493 16.0102C7.89842 15.9137 7.8442 15.7828 7.8442 15.6463C7.8442 15.5098 7.89842 15.3789 7.99493 15.2824L15.2728 8.00452Z"
              fill="#6F62FE"
            />
          </svg>
        }
        onDelete={() => handleDelete(chip)}
        sx={{
          ...style,
          padding: '6px 0px 6px 8px',
          backgroundColor: 'purple.tinted',
          borderRadius: '2px',
          height: '24px',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          '& .MuiChip-label': {
            padding: '0px',
          },
        }}
      />
    </Grid>
  )
}

export default TagChip
