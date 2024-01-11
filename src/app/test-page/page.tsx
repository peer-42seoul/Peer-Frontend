'use client'
import React from 'react'
import * as icon from '@/icons'
import Grid from '@mui/material/Unstable_Grid2/'
import { Box } from '@mui/material'
import DisplaySetting from '../my-page/homepage-setting/panel/DisplaySetting'

const Page = () => {
  return (
    <Grid
      container
      rowSpacing={4}
      columnSpacing={1}
      justifyContent={'flex-start'}
      alignItems={'center'}
    >
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.ArrowDown sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.ArrowUp sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.ChevronLeft sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.ChevronRight sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.CloseIcon sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.EditIcon sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.FileIcon sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.ImageIcon sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.LinkIcon sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.ListIcon sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.MoreHorizontalIcon sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.NotificationIcon sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.PictureIcon sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.PlusIcon sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.ReportIcon sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.SendIcon sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.ShareIcon sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.SearchIcon sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.TagIcon sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.TrashIcon sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={1}>
        <Box sx={{ width: '1rem', height: '1rem' }}>
          <icon.UserCheckIcon sx={{ color: 'text.normal' }} />
        </Box>
      </Grid>
      <Grid xs={12}>
        <DisplaySetting />
      </Grid>
    </Grid>
  )
}

export default Page
