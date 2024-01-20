import { create } from 'zustand'
import { IWidget } from '@/types/ITeamDnDLayout'
import axios from 'axios'
import useAuthStore from '@/states/useAuthStore'
import { AlertColor } from '@mui/material'

interface IStoreDnDState {
  teamId: number | undefined
  setTeamId: (teamId: number | undefined) => void
  storedWidgets: IWidget[] | undefined
  setStoredWidgets: (updatedData: IWidget[]) => void
  setStoreWidgetData: (key: number | string | null, data: any) => any
  toastMessage: { severity: AlertColor; message: string }
  setToastMessage: (message: { severity: AlertColor; message: string }) => void
}

/**
 * @param {string} teamId: 팀 아이디
 * @param {function} setTeamId: 팀 아이디 변경 함수
 * @param {IWidget[]} storedWidgets: 팀 아이디에 해당하는 위젯 데이터 (위젯 변경 리퀘스트 시 사용)
 * @param {function} setStoredWidgets: 팀 아이디에 해당하는 위젯 데이터 변경 함수 (위젯 변경 리퀘스트 시 사용)
 * @param {function} setStoreWidgetData: 팀 아이디에 해당하는 위젯 데이터 변경 함수 (위젯 변경 리퀘스트 시 사용)
 * @param {IToastProps} toastMessage: 토스트 메시지
 * @param {function} setToastMessage: 토스트 메시지 변경 함수
 */
const useDnDStore = create<IStoreDnDState>((set) => {
  const accessToken = useAuthStore.getState().accessToken
  const toastMessage = {
    open: false,
    message: '',
    severity: 'success' as AlertColor,
  }

  return {
    // 토스트 메세지
    toastMessage,
    setToastMessage: (message: { severity: AlertColor; message: string }) =>
      set(() => ({ toastMessage: { ...message } })),
    // DnD 업데이트
    teamId: undefined,
    setTeamId: (teamId: number | undefined) => set(() => ({ teamId })),
    storedWidgets: [],
    setStoredWidgets: (updatedData: IWidget[]) =>
      set(() => ({ storedWidgets: updatedData })),
    setStoreWidgetData: (key: number | string | null, data: any) => {
      set((state) => {
        if (!state.teamId || !key || !state.storedWidgets) return state

        //dndData에서 key값이 동일한 widgets 찾기
        const index = state.storedWidgets.findIndex(
          (widget: IWidget) => widget.key == key,
        )

        //못찾으면 리턴
        if (index === -1) return state

        //@todo 임시 조치. 백엔드와 상의 후 JSON.stringify 수정 필요
        const updatedWidgets = state.storedWidgets?.map(
          (widget: IWidget, widgetIdx: number) => {
            if (index == widgetIdx) {
              return { ...widget, data: JSON.stringify(data) }
            }
            return { ...widget, data: JSON.stringify(widget?.data) }
          },
        )

        //요청
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dnd-main/update`,
            {
              teamId: state.teamId,
              type: 'team',
              widgets: updatedWidgets,
            },
            { headers: { Authorization: `Bearer ${accessToken}` } },
          )
          .then(() => {
            state.setToastMessage({
              severity: 'success',
              message: '수정에 성공하였습니다.',
            })
            return { storedWidgets: updatedWidgets }
          })
          .catch((err) => {
            console.log(err)
            state.setToastMessage({
              severity: 'error',
              message: '수정에 실패하였습니다.',
            })
          })
        return state
      })
    },
  }
})

export default useDnDStore
