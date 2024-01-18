import { Chip, Stack, Typography } from '@mui/material'
import React from 'react'
import ProfileSection from './ProfileSection'
import { ITag } from '@/types/IPostDetail'

const Skills = ({
  skillList,
  setModalType,
}: {
  skillList: Array<ITag>
  setModalType: (type: string) => void
}) => {
  return (
    <Stack direction={'column'} spacing={'0.5rem'}>
      <ProfileSection
        sectionTitle="skills"
        setModalType={setModalType}
        titleTypographyProps={{
          color: 'text.strong',
          variant: 'CaptionEmphasis',
        }}
      />
      <Stack
        justifyContent={'flex-start'}
        direction={'row'}
        alignItems={'baseline'}
        gap={1}
        flexWrap={'wrap'}
      >
        {skillList.map((skill) => (
          <Chip
            key={skill.tagId}
            label={
              <Typography variant={'Tag'} color={'purple.strong'}>
                {skill.name}
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
