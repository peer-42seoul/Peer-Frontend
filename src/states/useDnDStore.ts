import { create } from 'zustand'
import { IWidget } from '@/types/ITeamDnDLayout'
import axios from 'axios'
import useAuthStore from '@/states/useAuthStore'

interface IStoreDnDState {
  teamId: number | undefined
  setTeamId: (teamId: number | undefined) => void
  storedWidgets: IWidget[] | undefined
  setStoredWidgets: (updatedData: IWidget[]) => void
  setStoreWidgetData: (key: number | string | null, data: any) => any
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
        let updatedWidgets = [...state.storedWidgets]
        updatedWidgets[index].data = JSON.stringify(data)

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
            return { storedWidgets: updatedWidgets }
          })
          .catch((err) => {
            console.log(err)
          })
        return state
      })
    },
  }
})

export default useDnDStore
