import { create } from 'zustand'

interface IMessageStore {
  storeNickname: string
  setNickname: (storeNickname: string) => void
}

const useMessageStore = create<IMessageStore>()((set) => ({
  storeNickname: '',
  setNickname: (storeNickname: string) => set({ storeNickname }),
}))

export default useMessageStore
