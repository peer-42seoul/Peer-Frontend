import { create } from 'zustand'
import { IMessagObject } from '@/types/IMessageInformation'

interface IMessageDataState {
  messages: IMessagObject[] // 실제 렌더링에 쓰이는 메시지
  setMessages: (messages: IMessagObject[]) => void
  resetMessages: () => void
}

const useMessageDataState = create<IMessageDataState>((set) => ({
  messages: [],
  setMessages: (messages: IMessagObject[]) => set({ messages: messages }),
  resetMessages: () => set({ messages: [] }),
}))

export default useMessageDataState
