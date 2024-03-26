import { ISkill } from '@/types/IUserProfile'
import React from 'react'
import TagChip from '../TagChip'
import { Typography } from '@mui/material'

const SkillList = ({
  skillList,
  setSkillList,
  tagList,
  type,
  error,
}: {
  skillList: ISkill[]
  setSkillList: (value: ISkill[]) => void
  tagList: ISkill[]
  type: 'SKILL' | 'TAG'
  error: boolean
}) => {
  return (
    <>
      {skillList.length ? (
        skillList.map((skill) => {
          const tag = tagList.find((tag) => tag.name === skill.name)
          if (!tag) return null
          return (
            <TagChip
              key={tag.tagId}
              name={tag.name}
              onDelete={() => {
                const newTags = skillList.filter(
                  (curTag) => curTag.name !== tag.name,
                )
                setSkillList(newTags)
              }}
              color={tag.color}
            />
          )
        })
      ) : error ? (
        <Typography variant="Caption" color={'error'}>
          필수 항목입니다.
        </Typography>
      ) : (
        <Typography variant={'Caption'} color={'text.alternative'}>
          선택된 {type === 'SKILL' ? '스킬이' : '태그가'} 없습니다.
        </Typography>
      )}
    </>
  )
}

export default SkillList
