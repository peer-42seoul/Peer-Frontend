import { create } from 'zustand'

interface IMessageStore {
  storedTargetId: number
  setNickname: (storedTargetId: number) => void
}

const useMessageStore = create<IMessageStore>()((set) => ({
  storedTargetId: 0,
  setNickname: (storedTargetId: number) => set({ storedTargetId }),
}))

export default useMessageStore
