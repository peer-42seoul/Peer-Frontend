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
  isPublic,
  showcaseId,
  teamId,
}: {
  isPublished: boolean
  isPublic: boolean
  showcaseId: number
  teamId: number
}) => {
  const [isShow, setIsShow] = useState(isPublic)
  const { isOpen: alertOpen, closeModal, openModal } = useModal()
  const router = useRouter()
  const axiosWithAuth = useAxiosWithAuth()

  // #TODO: axios 실패 시 toast 적용하기
  const handleChange = async () => {
    try {
      setIsShow(!isShow)
      await axiosWithAuth.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/public/${showcaseId}`,
      )
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 403:
            alert('팀 리더가 아닙니다.')
            break
          case 404:
            alert('해당 쇼케이스가 존재하지 않습니다.')
            break
          default:
            alert('알 수 없는 에러가 발생했습니다.')
            break
        }
      } else if (error.request) {
        alert('서버와의 연결이 끊겼습니다.')
      } else {
        alert('알 수 없는 에러가 발생했습니다.')
      }
    }
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
            message="보기"
            style={{
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '0.75rem',
            }}
            action={() => {
              router.push(`/showcase/detail/${showcaseId}`)
            }}
          />
          <CuButton
            style={{
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '0.75rem',
            }}
            startIcon={<EditIcon width={'1.25rem'} height={'1.25rem'} />}
            message="수정"
            action={() => {
              router.push(`/showcase/edit?showcaseId=${showcaseId}`)
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
            router.push(`/showcase/write?showcaseId=${teamId}`)
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
