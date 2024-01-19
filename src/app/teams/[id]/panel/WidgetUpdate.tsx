import CuTextModal from '@/components/CuTextModal'
import { Box, Stack } from '@mui/material'
import { BrowserView } from 'react-device-detect'
import CuButton from '@/components/CuButton'
import React, { useCallback, useState } from 'react'
import useAxiosWithAuth from '@/api/config'
import useToast from '@/hook/useToast'
import IToastProps from '@/types/IToastProps'
import { IWidget } from '@/types/ITeamDnDLayout'

interface IWidgetUpdateProps {
  edit: boolean
  setEdit: (edit: boolean) => void
  layouts: IWidget[]
  teamId: number | string
  isCreate: boolean
  cancelAction: () => void
  trigger: any
}

const WidgetUpdate = ({
  edit,
  setEdit,
  teamId,
  layouts,
  isCreate,
  cancelAction,
  trigger,
}: IWidgetUpdateProps) => {
  const [isOpen, setOpen] = useState(false)
  const axiosInstance = useAxiosWithAuth()
  const { CuToast, isOpen: toastOpen, openToast, closeToast } = useToast()
  const [toastMessage, setToastMessage] = useState<IToastProps>(
    {} as IToastProps,
  )

  /* 변경된 팀페이지 위젯 request */
  const handleSave = useCallback(async () => {
    try {
      const teamWidgetInfo = {
        teamId,
        type: 'team',
        widgets: layouts?.map((layout) => {
          return { ...layout, key: layout?.grid?.i }
        }),
      }
      if (isCreate) {
        await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dnd-main/create`,
          teamWidgetInfo,
        )
      } else
        await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dnd-main/update`,
          teamWidgetInfo,
        )
      setToastMessage({
        severity: 'success',
        message: '수정에 성공하였습니다.',
      })
      openToast()
      setOpen(false)
      setEdit(false)
      trigger()
    } catch (e) {
      console.log('e', e)
      setToastMessage({
        severity: 'error',
        message: '수정에 실패하였습니다.',
      })
      openToast()
    }
  }, [axiosInstance, isCreate, teamId, openToast, setEdit, layouts])

  return (
    <Box mb={2}>
      {/*request와 관련된 toast*/}
      <CuToast
        severity={toastMessage?.severity}
        open={toastOpen}
        onClose={closeToast}
      >
        {toastMessage?.message}
      </CuToast>
      {/*확인 모달*/}
      <CuTextModal
        open={isOpen}
        onClose={() => setOpen(false)}
        title={'팀페이지 저장'}
        containedButton={{
          text: '확인',
          onClick: handleSave,
        }}
        textButton={{
          text: '취소',
          onClick: () => setOpen(false),
        }}
        content={'팀 페이지를 저장하시겠습니까?'}
      />
      <BrowserView>
        {/* 팀페이지 수정 버튼 */}
        <Stack
          alignItems={'center'}
          direction={'row'}
          spacing={1}
          justifyContent={'flex-end'}
        >
          {edit && (
            <CuButton
              TypographyProps={{
                variant: 'Body2Emphasis',
              }}
              message={'취소'}
              action={() => {
                // 취소 시 최초의 widget 상태로 되돌림
                cancelAction()
                setEdit(!edit)
              }}
              variant={'outlined'}
            />
          )}
          <CuButton
            message={edit ? '저장' : '팀페이지 수정'}
            TypographyProps={{
              variant: 'Body2Emphasis',
            }}
            action={() => {
              if (edit) return setOpen(true)
              setEdit(!edit)
            }}
            variant={edit ? 'contained' : 'text'}
          />
        </Stack>
      </BrowserView>
    </Box>
  )
}

export default WidgetUpdate
