import { ISkill } from '@/types/IUserProfile'
import {
  Autocomplete,
  CircularProgress,
  SxProps,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ControllerRenderProps, UseFormTrigger } from 'react-hook-form'
import { convertNonAlphabeticToHex } from '@/utils/convertNonAlpbabetToHex'
import { getUniqueArray } from '@/utils/getUniqueArray'
import useAxiosWithAuth from '@/api/config'

const TIMEOUT = 500

const SkillComboBox = ({
  skillList,
  setSkillList,
  tagList,
  setTagList,
  field,
  error,
  trigger,
  placeholder,
  autocompleteSx,
}: {
  skillList: ISkill[]
  setSkillList: (value: ISkill[]) => void
  tagList: ISkill[]
  setTagList: React.Dispatch<React.SetStateAction<ISkill[]>>
  field?: ControllerRenderProps<any, 'tagList'>
  error?: boolean
  trigger?: UseFormTrigger<any>
  placeholder?: string
  autocompleteSx?: SxProps
}) => {
  const [text, setText] = useState('') // 검색 텍스트

  const [isLoading, setIsLoading] = useState(false)
  const [timeout, setTimeout] = useState(TIMEOUT)

  const axiosWithAuth = useAxiosWithAuth()

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeout((prev) => {
        if (prev === 0) {
          return prev
        } else {
          return prev - TIMEOUT / 2
        }
      })
    }, TIMEOUT / 2)

    return () => clearInterval(countdown)
  }, [])

  useEffect(() => {
    if (timeout === 0 && text !== '' && isLoading) {
      axiosWithAuth
        .get(
          `${
            process.env.NEXT_PUBLIC_CSR_API
          }/api/v1/skill/search?keyword=${convertNonAlphabeticToHex(text)}`,
        )
        .then((res) => {
          setTagList((prev) => getUniqueArray(prev.concat(res.data), 'tagId'))
          setIsLoading(false)
        })
        .catch(() => {
          setIsLoading(false)
        })
        .finally(() => {
          setTimeout(TIMEOUT)
        })
    }
  }, [timeout])

  const handleTextFieldChange = (e: any) => {
    setText(e.target.value)
    if (e.target.value === '') {
      setIsLoading(false)
      return
    } else if (isLoading === false) {
      setIsLoading(true)
    }
    setTimeout(TIMEOUT)
  }

  const handleInput = (_: any, value: string[]) => {
    if (value.length < skillList.length) {
      return
    }
    const newSkillList: ISkill[] = []
    value.map((newValue) => {
      newSkillList.push(
        tagList.find((skill) => newValue === skill.name) as ISkill,
      )
    })
    setSkillList(newSkillList)
    if (trigger) trigger('tagList')
  }

  return (
    <Autocomplete
      {...field}
      multiple
      sx={{
        fieldset: {
          height: '2.5rem',
        },
      }}
      disableClearable
      loading={isLoading}
      value={skillList.map((skill) => skill.name)}
      inputValue={text}
      options={tagList.map((tag) => tag.name)}
      onChange={handleInput}
      renderTags={() => <></>}
      renderInput={(params) => (
        <TextField
          {...params}
          disabled={skillList?.length >= 10}
          onChange={handleTextFieldChange}
          size="small"
          placeholder={
            placeholder ?? '프레임워크 또는 개발언어를 입력해주세요.'
          }
          sx={{ position: 'relative', maxWidth: '26rem', ...autocompleteSx }}
          error={error}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress
                    color="primary"
                    size={'1.25rem'}
                    sx={{
                      position: 'absolute',
                      left: ['82.5%', '87.5%'],
                    }}
                  />
                ) : null}
                {/* {params.InputProps.endAdornment} */}
              </>
            ),
          }}
        />
      )}
    />
  )
}

export default SkillComboBox
