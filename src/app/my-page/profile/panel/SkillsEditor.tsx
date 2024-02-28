import useAxiosWithAuth from '@/api/config'
import CuModal from '@/components/CuModal'
import FieldWithLabel from '@/components/FieldWithLabel'
import SkillAutocomplete from '@/components/SkillAutocomplete'
import Tutorial from '@/components/Tutorial'
import { SkillsTutorial } from '@/components/tutorialContent/SkillsTutorial'
import useToast from '@/states/useToast'
import { ISkill } from '@/types/IUserProfile'
import React, { useState } from 'react'

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
  const [selected, setSelected] = useState<Array<ISkill>>(skillList) // 선택 된 데이터

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { openToast, closeToast } = useToast()

  const axiosWithAuth = useAxiosWithAuth()

  const handleCancelClose = () => {
    setSelected(skillList)
    closeModal()
  }

  const handleModalClose = () => {
    closeToast()
    setIsSubmitting(true)
    axiosWithAuth
      .put('/api/v1/skill/regist', selected)
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
      <FieldWithLabel
        label={'나의 스킬'}
        endIconButton={
          <Tutorial title="스킬 추가 방법" content={<SkillsTutorial />} />
        }
      >
        <SkillAutocomplete
          skillList={selected}
          setSkillList={setSelected}
          type="SKILL"
          placeholder="스킬을 입력해주세요"
        />
      </FieldWithLabel>
    </CuModal>
  )
}

export default SkillsEditor
