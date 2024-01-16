'use client'
import React from 'react'
import * as icon from '@/icons'
import Grid from '@mui/material/Unstable_Grid2/'
import { Box, Typography } from '@mui/material'
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
      <Grid xs={12}>
        <Typography variant="HeadlineEmphasis">HeadlineEmphasis</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="Headline">Headline</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="Title1Emphasis">Title1Emphasis</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="Title1">Title1</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="Title2Emphasis">Title2Emphasis</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="Title2">Title2</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="Title3Emphasis">Title3Emphasis</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="Title3">Title3</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="Body1Emphasis">Body1Emphasis</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="Body1">Body1</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="Body2Emphasis">Body2Emphasis</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="Body2">Body2</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="CaptionEmphasis">CaptionEmphasis</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="Caption">Caption</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="Tag">Tag</Typography>
      </Grid>
      <hr />
      <Grid xs={12}>
        <Typography variant="h1">h1</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="h2">h2</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="h3">h3</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="h4">h4</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="h5">h5</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="h6">h6</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="subtitle1">subtitle1</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="subtitle2">subtitle2</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="body1">body1</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="body2">body2</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="button">button</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="caption">caption</Typography>
      </Grid>
      <Grid xs={12}>
        <Typography variant="overline">overline</Typography>
      </Grid>
    </Grid>
  )
}

export default Page
