import useAxiosWithAuth from '@/api/config'
import useModal from '@/hook/useModal'
import { ISkill } from '@/types/IUserProfile'
import { getUniqueArray } from '@/utils/getUniqueArray'
import {
  Autocomplete,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import CuTextModal from './CuTextModal'
import TagChip from './TagChip'
import { ControllerRenderProps, UseFormTrigger } from 'react-hook-form'

const TIMEOUT = 500

// 리액트 훅 폼을 위한 리펙토링 필요
const SkillAutocomplete = ({
  skillList,
  setSkillList,
  type,
  field,
  error,
  trigger,
  placeholder,
}: {
  skillList: Array<ISkill> //  초기 스킬 리스트
  setSkillList: (value: Array<ISkill>) => void // 스킬 리스트 변경 함수
  type: 'SKILL' | 'TAG' // 스킬인지 태그인지 구분
  field?: ControllerRenderProps<any, 'tagList'> // 리액트 훅 폼에 name을 무조건 'tagList'로 해야함
  error?: boolean
  trigger?: UseFormTrigger<any>
  placeholder?: string
}) => {
  const [tagList, setTagList] = useState(skillList) // 검색 된 데이터

  const [text, setText] = useState('') // 검색 텍스트

  const [timeOut, setTimeOut] = useState(TIMEOUT)
  const [isLoading, setIsLoading] = useState(false)

  const axiosWithAuth = useAxiosWithAuth()

  const {
    isOpen,
    openModal: openAlertModal,
    closeModal: closeAlertModal,
  } = useModal()

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeOut((prev) => prev - TIMEOUT / 5)
    }, TIMEOUT / 5)

    return () => clearInterval(countdown)
  }, [timeOut])

  useEffect(() => {
    if (timeOut === 0 && text !== '' && isLoading) {
      if (text.length < 2) {
        setTimeOut(TIMEOUT)
        return
      }
      axiosWithAuth
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/skill/search?keyword=${text}`,
        )
        .then((res) => {
          setTagList((prev) => getUniqueArray(prev.concat(res.data), 'tagId'))
          setIsLoading(false)
        })
        .catch(() => {
          setIsLoading(false)
        })
    }
  }, [timeOut])

  const handleTextFieldChange = (e: any) => {
    setText(e.target.value)
    if (e.target.value === '') {
      setIsLoading(false)
      return
    } else if (isLoading === false) {
      setIsLoading(true)
    }
    setTimeOut(TIMEOUT)
  }

  const handleInput = (_: any, value: string[]) => {
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
    <>
      <Autocomplete
        {...field}
        multiple
        sx={{
          fieldset: {
            height: '2.5rem',
          },
        }}
        loading={isLoading}
        value={skillList.map((skill) => skill.name) as Array<string>}
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
            sx={{ position: 'relative', maxWidth: '26rem' }}
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
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <Stack
        rowGap={['1rem', '0.5rem']}
        columnGap={['6px', '0.5rem']}
        direction={'row'}
        flexWrap={'wrap'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        maxWidth={'26rem'}
      >
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          width={1}
          alignItems={'center'}
        >
          <Typography variant={'Caption'} color={'text.normal'}>
            선택한 {type === 'SKILL' ? '스킬' : '태그'} ({skillList.length}/10)
          </Typography>
          <Button
            variant={'text'}
            sx={{ height: '1.5rem' }}
            onClick={openAlertModal}
          >
            <Typography
              variant={'Caption'}
              color={'text.alternative'}
              lineHeight={'normal'}
            >
              전체 삭제
            </Typography>
          </Button>
        </Stack>
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
      </Stack>
      <CuTextModal
        open={isOpen}
        title={`${type === 'SKILL' ? '스킬' : '태그'} 전체 삭제`}
        content={`선택한 ${
          type === 'SKILL' ? '스킬을' : '태그를'
        } 전체 삭제하시겠습니까?`}
        onClose={closeAlertModal}
        containedButton={{
          text: '확인',
          onClick: () => {
            setSkillList([])
            closeAlertModal()
          },
        }}
        textButton={{
          text: '취소',
          onClick: closeAlertModal,
        }}
      />
    </>
  )
}

export default SkillAutocomplete
