import useAxiosWithAuth from '@/api/config'
import CuButton from '@/components/CuButton'
import CuTextModal from '@/components/CuTextModal'
import CuTypeToggle from '@/components/CuTypeToggle'
import useModal from '@/hook/useModal'
import { EditIcon } from '@/icons'
import { FormControlLabel } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const IntersectionSection = ({
  isPublished,
  showcaseId,
}: {
  isPublished: boolean
  showcaseId: number
}) => {
  const [isShow, setIsShow] = useState(false)
  const { isOpen: alertOpen, closeModal, openModal } = useModal()
  const router = useRouter()
  const axiosWithAuth = useAxiosWithAuth()

  const handleChange = () => {
    setIsShow(!isShow)
  }

  const deleteShowcase = () => {
    axiosWithAuth.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/${showcaseId}`,
    )
    closeModal()
  }

  return (
    <>
      {isPublished ? (
        <>
          <CuButton
            message="쇼케이스 보기"
            style={{
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '0.75rem',
            }}
            action={() => {
              router.push(`/showcase/${showcaseId}`)
            }}
          />
          <CuButton
            message="삭제"
            style={{
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '0.75rem',
            }}
            action={() => {
              openModal()
            }}
          />
          <FormControlLabel
            control={<CuTypeToggle checked={isShow} onChange={handleChange} />}
            label={isShow ? 'ON' : 'OFF'}
          />
        </>
      ) : (
        <CuButton
          style={{
            textAlign: 'center',
            fontWeight: '600',
            fontSize: '0.75rem',
          }}
          startIcon={<EditIcon width={'1.25rem'} height={'1.25rem'} />}
          message="쇼케이스 작성하기"
          action={() => {
            router.push('/showcase/write')
          }}
        />
      )}
      <CuTextModal
        open={alertOpen}
        onClose={closeModal}
        title={'경고'}
        content={'삭제된 쇼케이스는 복구할 수 없습니다.'}
        containedButton={{
          text: '삭제',
          onClick: deleteShowcase,
        }}
        textButton={{
          text: '취소',
          onClick: closeModal,
        }}
      />
    </>
  )
}

export default IntersectionSection
