import useModal from '@/hook/useModal'
import { ISkill } from '@/types/IUserProfile'
import { Button, Stack, SxProps, Typography } from '@mui/material'
import React, { useState } from 'react'
import CuTextModal from './CuTextModal'
import { ControllerRenderProps, UseFormTrigger } from 'react-hook-form'
import SkillComboBox from './skillAutocomplete/SkillComboBox'
import SkillList from './skillAutocomplete/SkillList'

// 리액트 훅 폼을 위한 리펙토링 필요
const SkillAutocomplete = ({
  skillList,
  setSkillList,
  type,
  field,
  error,
  trigger,
  placeholder,
  autocompleteSx,
}: {
  skillList: Array<ISkill> //  초기 스킬 리스트
  setSkillList: (value: Array<ISkill>) => void // 스킬 리스트 변경 함수
  type: 'SKILL' | 'TAG' // 스킬인지 태그인지 구분
  field?: ControllerRenderProps<any, 'tagList'> // 리액트 훅 폼에 name을 무조건 'tagList'로 해야함
  error?: boolean
  trigger?: UseFormTrigger<any>
  placeholder?: string
  autocompleteSx?: SxProps
}) => {
  const [tagList, setTagList] = useState(skillList) // 검색 된 데이터

  const {
    isOpen,
    openModal: openAlertModal,
    closeModal: closeAlertModal,
  } = useModal()

  return (
    <>
      <SkillComboBox
        skillList={skillList}
        setSkillList={setSkillList}
        tagList={tagList}
        setTagList={setTagList}
        field={field}
        error={error}
        trigger={trigger}
        placeholder={placeholder}
        autocompleteSx={autocompleteSx}
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
        <SkillList
          skillList={skillList}
          setSkillList={setSkillList}
          tagList={tagList}
          type={type}
          error={!!error}
        />
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
