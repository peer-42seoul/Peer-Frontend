import useAxiosWithAuth from '@/api/config'
import CuButton from '@/components/CuButton'
import CuTextModal from '@/components/CuTextModal'
import CuTypeToggle from '@/components/CuTypeToggle'
import useModal from '@/hook/useModal'
import { FormControlLabel } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import * as style from './IntersectionSection.style'
import useToast from '@/hook/useToast'

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
  const [errorMessages, setErrorMessages] = useState<string>('')
  const { CuToast, isOpen, openToast, closeToast } = useToast()

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
            setErrorMessages('팀 리더가 아닙니다.')
            openToast()
            break
          case 404:
            setErrorMessages('해당 쇼케이스가 존재하지 않습니다.')
            openToast()
            break
          default:
            setErrorMessages('알 수 없는 에러가 발생했습니다.')
            openToast()
            break
        }
      } else if (error.request) {
        setErrorMessages('서버와 연결할 수 없습니다.')
        openToast()
      } else {
        setErrorMessages('알 수 없는 에러가 발생했습니다.')
        openToast()
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
            style={style.isPublishedButton}
            TypographyProps={style.textInButton}
            action={() => {
              router.push(`/showcase/detail/${showcaseId}`)
            }}
          />
          <CuButton
            style={style.isPublishedButton}
            TypographyProps={style.textInButton}
            message="수정"
            action={() => {
              router.push(`/showcase/edit?showcaseId=${showcaseId}`)
            }}
          />
          <CuButton
            message="삭제"
            style={style.isPublishedButton}
            TypographyProps={style.textInButton}
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
            width: '8.65rem',
            height: '2rem',
            padding: '0 0.25rem 0 0.25rem',
          }}
          TypographyProps={style.textInButton}
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
      <CuToast
        open={isOpen}
        onClose={closeToast}
        severity="error"
        message={errorMessages}
      />
    </>
  )
}

export default IntersectionSection
