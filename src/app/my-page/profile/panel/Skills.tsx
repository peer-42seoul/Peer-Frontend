import { Chip, Stack, Typography } from '@mui/material'
import React from 'react'
import ProfileSection from './ProfileSection'
import { ISkill } from '@/types/IUserProfile'

const Skills = ({
  skillList,
  setModalType,
  isEditable,
}: {
  skillList: Array<ISkill>
  setModalType: (type: string) => void
  isEditable: boolean
}) => {
  console.log(skillList)
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
        {skillList?.length ? (
          skillList.map((skill) => (
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
          ))
        ) : (
          <Typography variant={'Caption'} color={'text.alternative'}>
            등록된 스킬이 없습니다.
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default Skills
