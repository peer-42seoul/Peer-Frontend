// TODO : 필요 여부 다시 확인할 것
import { create } from 'zustand'

interface IMessageStore {
  storedSelectedUser: number
  storedTargetId: number
  storedConversationalId: number
  storedTargetProfile: string
  setNickname: (storedTargetId: number) => void
  setStoredConversationalId: (storedConversationalId: number) => void
  setStoredTargetProfile: (storedTargetProfile: string) => void
}

const useMessageStore = create<IMessageStore>()((set) => ({
  storedSelectedUser: 0,
  setSelectedUser: (storedSelectedUser: number) => set({ storedSelectedUser }),

  storedTargetId: 0,
  setNickname: (storedTargetId: number) => set({ storedTargetId }),
  storedConversationalId: 0,

  setStoredConversationalId: (storedConversationalId: number) =>
    set({ storedConversationalId }),

  storedTargetProfile: '',
  setStoredTargetProfile: (storedTargetProfile: string) =>
    set({ storedTargetProfile }),
}))

export default useMessageStore
