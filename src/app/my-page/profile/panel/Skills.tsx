import { Chip, Stack, Typography } from '@mui/material'
import React from 'react'
import ProfileSection from './ProfileSection'

const Skills = ({
  setModalType,
  isEditable,
}: {
  setModalType: (type: string) => void
  isEditable: boolean
}) => {
  const skills = [
    'test',
    'test2',
    'test3',
    'test4',
    'test5',
    'test6',
    'test7',
    'test8',
    'test9',
  ]
  return (
    <Stack direction={'column'} spacing={'0.5rem'}>
      <ProfileSection
        sectionTitle="skills"
        setModalType={setModalType}
        titleTypographyProps={{
          color: 'text.strong',
          variant: 'CaptionEmphasis',
        }}
        isEditable={isEditable}
      />
      <Stack
        justifyContent={'flex-start'}
        direction={'row'}
        alignItems={'baseline'}
        gap={1}
        flexWrap={'wrap'}
      >
        {skills.map((skill) => (
          <Chip
            key={skill}
            label={
              <Typography variant={'Tag'} color={'purple.strong'}>
                {skill}
              </Typography>
            }
            sx={{
              padding: '0px 6px',
              backgroundColor: 'purple.tinted',
              borderRadius: '2px',
              height: '1.25rem',
              '& .MuiChip-label': {
                padding: '0px',
              },
            }}
          />
        ))}
      </Stack>
    </Stack>
  )
}

export default Skills
