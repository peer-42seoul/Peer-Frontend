import CuTextModal from '@/components/CuTextModal'
import { Box, Stack } from '@mui/material'
import { BrowserView } from 'react-device-detect'
import CuButton from '@/components/CuButton'
import React, { useCallback, useState } from 'react'
import useAxiosWithAuth from '@/api/config'
import { IWidget } from '@/types/ITeamDnDLayout'
import useDnDStore from '@/states/useDnDStore'

interface IWidgetUpdateProps {
  edit: boolean
  setEdit: (edit: boolean) => void
  layouts: IWidget[]
  isCreate: boolean
  cancelAction: () => void
}

const WidgetUpdate = ({
  edit,
  setEdit,
  layouts,
  isCreate,
  cancelAction,
}: IWidgetUpdateProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const axiosInstance = useAxiosWithAuth()
  const { teamId } = useDnDStore()

  /* 변경된 팀페이지 위젯 request */
  const handleSave = useCallback(async () => {
    try {
      const teamWidgetInfo = {
        teamId,
        type: 'team',
        widgets: layouts?.map((layout) => {
          //@todo 백엔드와 논의 후 JSON.stringify 지우기
          return {
            ...layout,
            data: layout.data ? JSON.stringify(layout?.data) : undefined,
          }
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
      alert('저장되었습니다.')
      setModalOpen(false)
      setEdit(false)
    } catch (e) {
      console.log('e', e)
      alert('저장에 실패하였습니다.')
    }
  }, [teamId, layouts, isCreate, axiosInstance, setEdit])

  return (
    <Box mb={2}>
      {/*확인 모달*/}
      <CuTextModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={'팀페이지 저장'}
        containedButton={{
          text: '확인',
          onClick: handleSave,
        }}
        textButton={{
          text: '취소',
          onClick: () => setModalOpen(false),
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
              if (edit) return setModalOpen(true)
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
