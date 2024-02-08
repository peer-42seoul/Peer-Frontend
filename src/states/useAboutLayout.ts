import { create } from 'zustand'

interface IAboutLayoutState {
  boardType: TAboutBoardType
  announceDetailId?: number
  resetState: () => void
  setBoard: (boardType: TAboutBoardType) => void
  setAnnounceDetail: (announceId: number) => void
}

export type TAboutBoardType =
  | 'PEER'
  | 'MIND'
  | 'ANNOUNCE'
  | 'DICTIONARY'
  | 'CONTACT'
  | 'PERSONAL'
  | 'SERVICE'
  | 'ANNOUNCE_DETAIL'

const useAboutLayout = create<IAboutLayoutState>((set) => ({
  boardType: 'PEER',
  resetState: () =>
    set({
      boardType: 'PEER',
    }),
  setBoard: (boardType) =>
    set({
      boardType,
    }),
  setAnnounceDetail: (announceId) =>
    set((state) => ({
      ...state,
      announceDetailId: announceId,
      boardType: 'ANNOUNCE_DETAIL',
    })),
}))

export default useAboutLayout
