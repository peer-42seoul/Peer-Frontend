import React from 'react'
import { Stack } from '@mui/material'
import TagIcon from '@/icons/TagIcon'
import LabelWithIcon from '../LabelWithIcon'
import * as style from './SkillInput.style'
import TagChip from '@/components/TagChip'
import { ISkill } from '@/types/IShowcaseEdit'

interface ISkillProps {
  skills: ISkill[]
}

const SkillInput = ({ skills }: ISkillProps) => {
  return (
    <Stack spacing={'0.75rem'} sx={style.skillInputViewer}>
      <LabelWithIcon
        svgIcon={<TagIcon sx={style.IconStyle} />}
        message="기술 스택"
        color="text.alternative"
      />
      <Stack spacing={'0.75rem'} py={1} direction={'row'} useFlexGap>
        {skills?.map((skill, index: number) => (
          <TagChip key={index} name={skill.name} color={skill.color} />
        ))}
      </Stack>
    </Stack>
  )
}

export default SkillInput
