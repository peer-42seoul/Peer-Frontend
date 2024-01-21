import CuButton from '@/components/CuButton'
import CuTypeToggle from '@/components/CuTypeToggle'
import { EditIcon } from '@/icons'
import { FormControlLabel, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const IntersectionSection = ({
  isShowcaseComplete,
}: {
  isShowcaseComplete: boolean
}) => {
  // TODO: 1. id백엔드에서 받아오기
  // TODO: 2. 공개여부 백엔드 연동

  const id = 3
  const router = useRouter()
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    console.log(`공개여부가 변경되었습니다. ${isShow}`)
  }, [isShow])

  const handleChange = () => {
    setIsShow(!isShow)
  }
  return (
    <>
      {isShowcaseComplete ? (
        <>
          <CuButton
            message="쇼케이스 보기"
            style={{
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '0.75rem',
            }}
            action={() => {
              router.push(`/showcase/${id}`)
            }}
          />
          {/* <CuButton
            message="쇼케이스 공개여부"
            style={{
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '0.75rem',
            }}
          /> */}
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
    </>
  )
}

export default IntersectionSection
