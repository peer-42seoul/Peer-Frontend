import { create } from 'zustand'

type TMessagePage = 'LIST' | 'DETAIL'

interface IMessagePage {
  messagePage: TMessagePage
  conversationId: number
  targetId: number
  setDetailPage: (conversationId: number, targetId: number) => void
  setListPage: () => void
}

const useMessagePageState = create<IMessagePage>((set) => ({
  messagePage: 'LIST',
  conversationId: 0,
  targetId: 0,
  setDetailPage: (conversationId: number, targetId: number) =>
    set({ messagePage: 'DETAIL', conversationId, targetId }),
  setListPage: () =>
    set({ messagePage: 'LIST', conversationId: 0, targetId: 0 }),
}))

export default useMessagePageState
