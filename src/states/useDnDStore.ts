import { create } from 'zustand'
import { IWidget } from '@/types/ITeamDnDLayout'
import axios from 'axios'
import useAuthStore from '@/states/useAuthStore'

interface IStoreDnDState {
  edit: boolean
  setEdit: (edit: boolean) => void
  teamId: number | undefined
  setTeamId: (teamId: number | undefined) => void
  storedWidgets: IWidget[] | undefined
  setStoredWidgets: (updatedData: IWidget[]) => any
  setStoredWidgetData: (key: number | string, data: any) => any
}

/**
 * @param {string} teamId: 팀 아이디
 * @param {function} setTeamId: 팀 아이디 변경 함수
 * @param {IWidget[]} storedWidgets: 팀 아이디에 해당하는 위젯 데이터 (위젯 변경 리퀘스트 시 사용)
 * @param {function} setStoredWidgets: 팀 아이디에 해당하는 위젯 데이터 변경 함수 (위젯 변경 리퀘스트 시 사용)
 * @param {function} setStoreWidgetData: 팀 아이디에 해당하는 위젯 데이터 변경 함수 (위젯 변경 리퀘스트 시 사용)
 */
const useDnDStore = create<IStoreDnDState>((set) => {
  const accessToken = useAuthStore.getState().accessToken

  return {
    // DnD 업데이트
    edit: false,
    setEdit: (edit: boolean) => set(() => ({ edit })),
    teamId: undefined,
    setTeamId: (teamId: number | undefined) => set(() => ({ teamId })),
    storedWidgets: [],
    setStoredWidgets: (updatedData: IWidget[]) =>
      set(() => ({ storedWidgets: updatedData })),
    setStoredWidgetData: (key: number | string | null, data: any) => {
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
            `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/dnd-main/update`,
            {
              teamId: state.teamId,
              type: 'team',
              widgets: updatedWidgets,
            },
            { headers: { Authorization: `Bearer ${accessToken}` } },
          )
          .then(() => {
            alert('수정되었습니다.')
            return { storedWidgets: updatedWidgets }
          })
          .catch(() => {
            alert('수정에 실패하였습니다.')
          })
        return state
      })
    },
  }
})

export default useDnDStore
