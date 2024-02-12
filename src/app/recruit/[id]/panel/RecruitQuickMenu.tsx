import { Stack } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import FavoriteButton from '@/components/FavoriteButton'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ShareMenuItem from '@/components/dropdownMenu/ShareMenuItem'
import DropdownMenu from '@/components/DropdownMenu'
import IconMenuItem from '@/components/dropdownMenu/IconMenuItem'
import useToast from '@/states/useToast'
import useModal from '@/hook/useModal'
import WriteIcon from '@/icons/Nav/WriteIcon'
import { TrashLineIcon } from '@/icons'
import * as style from '@/components/dropdownMenu/dropdownMenu.styles'
import { isAxiosError } from 'axios'
import CuTextModal from '@/components/CuTextModal'

const RecruitQuickMenu = ({
  favorite,
  recruit_id,
  title,
  content,
  me,
}: {
  favorite: boolean | undefined
  recruit_id: number
  title: string
  content: string
  me?: boolean
}) => {
  const path = usePathname()
  const type = useSearchParams().get('type')
  const router = useRouter()
  const [currentPageUrl, setCurrentPageUrl] = useState('')
  const axiosWithAuth = useAxiosWithAuth()
  const [isDeleting, setIsDeleting] = useState(false)
  const { openToast } = useToast()
  const { isOpen, openModal: openConfirmModal, closeModal } = useModal()

  //window is not defined 에러 방지
  useEffect(() => {
    setCurrentPageUrl(window.location.href)
  }, [])

  const handleDelete = () => {
    setIsDeleting(true)
    axiosWithAuth
      .delete(`/api/v1/recruit/${recruit_id}`)
      .then(() => {
        alert('모집글을 삭제했습니다.')
        router.push('/') // 모집글을 삭제한 뒤 메인으로 이동.
      })
      .catch((error: unknown) => {
        if (
          isAxiosError(error) &&
          error.response?.status === 400 &&
          error.response.data.message
        ) {
          openToast({
            severity: 'error',
            message: error.response.data.message,
          })
        } else {
          openToast({
            severity: 'error',
            message: '모집글 삭제에 실패했습니다.',
          })
        }
      })
      .finally(() => {
        setIsDeleting(false)
        closeModal()
      })
  }

  return (
    <>
      <Stack flexDirection={'row'} justifyContent={'flex-end'}>
        <FavoriteButton
          favorite={favorite}
          recruit_id={recruit_id}
          redirect_url={`${path}?type=${type}`}
        />
        <DropdownMenu>
          <ShareMenuItem
            title={title}
            url={currentPageUrl}
            content={content}
            message={currentPageUrl}
          />
          {me && (
            <IconMenuItem
              action={() => router.push(`/recruit/${recruit_id}/edit`)}
              icon={<WriteIcon sx={style.recruitMenuIcon} />}
              text={'수정'}
            />
          )}
          {me && (
            <IconMenuItem
              action={openConfirmModal}
              icon={<TrashLineIcon sx={style.recruitMenuIcon} />}
              text={'삭제'}
            />
          )}
        </DropdownMenu>
      </Stack>
      <CuTextModal
        open={isOpen}
        onClose={closeModal}
        title={'모집글을 삭제할까요?'}
        content={'승인된 팀원이 있거나 모집이 완료된 경우 삭제할 수 없어요.'}
        textButton={{
          text: '취소',
          onClick: closeModal,
        }}
        containedButton={{
          text: '삭제',
          onClick: handleDelete,
          isLoading: isDeleting,
        }}
      />
    </>
  )
}

export default RecruitQuickMenu
