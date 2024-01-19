import { create } from 'zustand'
import { ITeamDnDLayout, IWidget } from '@/types/ITeamDnDLayout'
import axios from 'axios'
import useAuthStore from '@/states/useAuthStore'

interface IStoreDnDState {
  dndData: ITeamDnDLayout
  setDndData: (updatedData: ITeamDnDLayout) => void
  setStoreWidgetData: (key: number | string | null, data: any) => any
}

/**
 * @param storeWidgets: 레이아웃에 포함된 위젯들
 * @param setDndData: 레이아웃에 포함된 위젯들을 업데이트하는 함수 (레이아웃 용)
 * @param setStoreWidgetData: 레이아웃에 포함된 특정 위젯을 업데이트하는 함수 (위젯 용)
 */
const useDnDStore = create<IStoreDnDState>((set) => {
  return {
    dndData: {} as ITeamDnDLayout,
    setDndData: (updatedData: ITeamDnDLayout) =>
      set(() => ({ dndData: updatedData })),
    setStoreWidgetData: (key: number | string | null, data: any) => {
      set((state) => {
        //dndData에서 key값이 동일한 widgets 찾기
        if (!key) return state
        const index = state.dndData?.widgets.findIndex(
          (widget: IWidget) => widget.key == key,
        )
        if (index === -1 || !state?.dndData) return state
        let updatedLayouts = { ...state.dndData }
        updatedLayouts.widgets[index].data = data

        const accessToken = useAuthStore.getState().accessToken
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dnd-main/update`,
            updatedLayouts,
            { headers: { Authorization: `Bearer ${accessToken}` } },
          )
          .then((res) => {
            return { dndData: res.data }
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
