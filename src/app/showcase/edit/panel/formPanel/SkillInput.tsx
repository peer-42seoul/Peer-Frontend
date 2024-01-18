import React from 'react'
import { Stack } from '@mui/material'
import TagIcon from '@/icons/TagIcon'
import LabelWithIcon from '../LabelWithIcon'
import * as Style from './SkillInput.style'
import TagChip from '@/components/TagChip'
import { ISkill } from '@/types/IShowcaseEdit'

interface ISkillProps {
  skills: ISkill[]
}

const SkillInput = ({ skills }: ISkillProps) => {
  return (
    <Stack direction={'column'} spacing={'0.5rem'} width={'26rem'}>
      <LabelWithIcon
        svgIcon={<TagIcon sx={Style.IconStyle} />}
        message="기술 스택"
      />
      <Stack
        spacing={0.75}
        py={1}
        flexWrap={'wrap'}
        width={1}
        direction={'row'}
        useFlexGap
      >
        {skills?.map((skill, index: number) => (
          <TagChip key={index} name={skill.name} color={skill.color} />
        ))}
      </Stack>
    </Stack>
  )
}

export default SkillInput
