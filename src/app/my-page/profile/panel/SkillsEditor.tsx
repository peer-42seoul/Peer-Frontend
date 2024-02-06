import useAxiosWithAuth from '@/api/config'
import CuModal from '@/components/CuModal'
import CuTextModal from '@/components/CuTextModal'
import TagChip from '@/components/TagChip'
import Tutorial from '@/components/Tutorial'
import { SkillsTutorial } from '@/components/tutorialContent/SkillsTutorial'
import useModal from '@/hook/useModal'
import useToast from '@/states/useToast'
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

// COMMENT :우선 해당 값으로 해두었으나 조정이 필요합니다. 밀리초 단위입니다.
const TIMEOUT = 500

const SkillsEditor = ({
  open,
  skillList,
  mutate,
  closeModal,
}: {
  open: boolean
  skillList: Array<ISkill>
  mutate: () => void
  closeModal: () => void
}) => {
  const [selected, setSelected] = useState<Array<string>>(
    skillList.map((skill) => skill.name) as Array<string>,
  ) // 선택 된 데이터
  const [tagList, setTagList] = useState([] as ISkill[]) // 검색 된 데이터

  const [text, setText] = useState('') // 검색 텍스트

  const [timeOut, setTimeOut] = useState(TIMEOUT)
  const [isLoading, setIsLoading] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { openToast, closeToast } = useToast()

  const axiosWithAuth = useAxiosWithAuth()

  const {
    isOpen,
    openModal: openAlertModal,
    closeModal: closeAlertModal,
  } = useModal()

  const handleCancelClose = () => {
    setSelected(skillList.map((skill) => skill.name) as Array<string>)
    closeModal()
  }

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

  const handleTextFiledChange = (e: any) => {
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
    setSelected(value)
  }

  const handleModalClose = () => {
    closeToast()
    setIsSubmitting(true)
    axiosWithAuth
      .put(
        '/api/v1/skill/regist',
        tagList.filter((tag) => selected.includes(tag.name)),
      )
      .then(() => {
        openToast({ severity: 'success', message: '스킬이 수정되었습니다.' })
        mutate()
        setIsSubmitting(false)
        closeModal()
      })
      .catch(() => {
        openToast({ severity: 'error', message: '스킬 수정에 실패했습니다.' })
        setIsSubmitting(false)
      })
  }

  return (
    <CuModal
      open={open}
      onClose={handleCancelClose}
      title={'스킬 수정'}
      mobileFullSize
      containedButton={{
        text: '완료',
        onClick: handleModalClose,
        isLoading: isSubmitting,
      }}
      textButton={{
        text: '취소',
        onClick: handleCancelClose,
      }}
    >
      <>
        <Stack direction={'column'} spacing={'1rem'} height={[1, undefined]}>
          <Stack direction={'row'} spacing={'0.25rem'}>
            <Typography variant={'CaptionEmphasis'} color={'text.strong'}>
              나의 스킬
            </Typography>
            <Tutorial
              title="기술 스택 추가 방법"
              content={<SkillsTutorial />}
            />
          </Stack>
          <Autocomplete
            multiple
            sx={{
              fieldset: {
                height: '2.5rem',
              },
            }}
            disableClearable
            loading={isLoading}
            value={selected}
            options={tagList.map((tag) => tag.name)}
            onChange={handleInput}
            renderTags={() => <></>}
            renderInput={(params) => (
              <TextField
                {...params}
                disabled={selected?.length >= 10}
                onChange={handleTextFiledChange}
                size="small"
                placeholder={'프레임워크 또는 개발언어를 입력해주세요.'}
                sx={{ position: 'relative' }}
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
          >
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              width={1}
              alignItems={'center'}
            >
              <Typography variant={'CaptionEmphasis'} color={'text.strong'}>
                선택한 스킬 ({selected.length}/10)
              </Typography>
              <Button
                variant={'text'}
                sx={{ height: '1.5rem' }}
                onClick={openAlertModal}
              >
                <Typography
                  variant={'CaptionEmphasis'}
                  color={'text.alternative'}
                  lineHeight={'normal'}
                >
                  전체 삭제
                </Typography>
              </Button>
            </Stack>
            {selected.length ? (
              selected.map((tagName) => {
                const tag =
                  tagList.find((tag) => tag.name === tagName) ??
                  skillList.find((tag) => tag.name === tagName)
                if (!tag) return null
                return (
                  <TagChip
                    key={tag.tagId}
                    name={tag.name}
                    onDelete={() => {
                      setSelected((prev) => {
                        const newTags = prev.filter(
                          (curTag) => curTag !== tag.name,
                        )
                        return newTags
                      })
                    }}
                    color={tag.color}
                  />
                )
              })
            ) : (
              <Typography variant={'Caption'} color={'text.alternative'}>
                선택된 스킬이 없습니다.
              </Typography>
            )}
          </Stack>
        </Stack>
        <CuTextModal
          open={isOpen}
          title={'스킬 전체 삭제'}
          content="스킬을 전체 삭제하시겠습니까?"
          onClose={closeAlertModal}
          containedButton={{
            text: '확인',
            onClick: () => {
              setSelected([])
              closeAlertModal()
            },
          }}
          textButton={{
            text: '취소',
            onClick: closeAlertModal,
          }}
        />
      </>
    </CuModal>
  )
}

export default SkillsEditor
