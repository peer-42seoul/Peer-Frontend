import { create } from 'zustand'
import { IMainOptionsStore } from '@/types/IMainOptions'

const useMainOptionsStore = create<IMainOptionsStore>((set) => {
  return {
    page: 1,
    sort: 'latest',
    // type: 'STUDY',
    type: 'ALL',
    init: true,
    detailOption: {
      isInit: true,
      due1: 0,
      due2: 100,
      region1: '',
      region2: '',
      place: '',
      status: '',
      tag: '',
    },
    openOption: false,
    setPage: (page: number) => set(() => ({ page })),
    setSort: (sort: any) => set(() => ({ sort })),
    setType: (type: any) => set(() => ({ type })),
    setInit: (init: boolean) => set(() => ({ init })),
    setDetailOptions: (detailOption: any) =>
      set(() => {
        return { detailOption }
      }),
    setOpenOption: (openOption: boolean) => set(() => ({ openOption })),
  }
})

export default useMainOptionsStore
