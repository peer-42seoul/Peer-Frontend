import { create } from 'zustand'

interface IMessageStore {
  newChat: boolean
  setNewChat: (newChat: boolean) => void
}

const useMessageStore = create<IMessageStore>()((set) => ({
  newChat: false,
  setNewChat: (newChat: boolean) => set(() => ({ newChat })),
}))

export default useMessageStore
