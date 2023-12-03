import { Chip, Grid, Typography } from '@mui/material'
import React from 'react'
import ProfileSection from './ProfileSection'

const Skills = ({ setModalType }: { setModalType: (type: string) => void }) => {
  const skills = ['test', 'test2', 'test3']
  return (
    <Grid
      container
      columnSpacing={1}
      rowSpacing={1}
      p={0}
      justifyContent={'flex-start'}
    >
      <Grid item xs={12}>
        <ProfileSection
          sectionTitle="skills"
          setModalType={setModalType}
          titleTypographyProps={{
            color: 'text.strong',
            variant: 'CaptionEmphasis',
          }}
        />
      </Grid>
      {skills.map((skill) => (
        <Grid item xs={0} key={skill}>
          <Chip
            label={
              <Typography variant={'Tag'} color={'purple.strong'}>
                {skill}
              </Typography>
            }
            sx={{
              padding: '0px 6px',
              backgroundColor: 'purple.tinted',
              borderRadius: '2px',
              height: '20px',
              '& .MuiChip-label': {
                padding: '0px',
              },
            }}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default Skills
