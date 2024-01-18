import useAxiosWithAuth from '@/api/config'
import CuModal from '@/components/CuModal'
import CuTextModal from '@/components/CuTextModal'
import TagChip from '@/components/TagChip'
import useModal from '@/hook/useModal'
import { ITag } from '@/types/IPostDetail'
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

// COMMENT :우선 해당 값으로 해두었으나 조정이 필요합니다.
const TIMEOUT = 0.5

const SkillsEditor = ({
  open,
  mutate,
  closeModal,
}: {
  open: boolean
  mutate: () => void
  closeModal: () => void
}) => {
  const [selected, setSelected] = useState([] as Array<string>) // 선택 된 데이터
  const [tagList, setTagList] = useState([] as ITag[]) // 검색 된 데이터

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
      setTimeOut((prev) => prev - 0.25)
    }, 250)

    return () => clearInterval(countdown)
  }, [timeOut])

  useEffect(() => {
    if (timeOut === 0 && text !== '' && isLoading) {
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

  return (
    <CuModal
      open={open}
      onClose={closeModal}
      title={'스킬 수정'}
      mobileFullSize
      containedButton={{
        text: '완료',
        onClick: () => {
          mutate()
          closeModal()
        },
      }}
      textButton={{
        text: '취소',
        onClick: closeModal,
      }}
    >
      <>
        <Stack direction={'column'} spacing={'1rem'} height={[1, undefined]}>
          <Typography variant={'CaptionEmphasis'} color={'text.strong'}>
            나의 스킬
          </Typography>
          <Autocomplete
            multiple
            sx={{
              fieldset: {
                height: '2.5rem',
              },
            }}
            loading={isLoading}
            value={selected}
            options={tagList.map((tag) => tag.name)}
            onChange={handleInput}
            renderTags={() => <></>}
            renderInput={(params) => (
              <TextField
                {...params}
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
                선택한 스킬
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
            {selected.map((tagName) => {
              const tag = tagList.find((tag) => tag.name === tagName)
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
                      console.log(newTags)
                      return newTags
                    })
                  }}
                  color={tag.color}
                />
              )
            })}
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
