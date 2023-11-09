import { create } from 'zustand'
import { IMessageListData } from '@/types/IMessage'

interface IMessageListStateState {
  messageList: IMessageListData[] // 실제 렌더링에 쓰이는 메시지
  setMessageList: (messageList: IMessageListData[]) => void
  resetMessageList: () => void
}

const useMessageListState = create<IMessageListStateState>((set) => ({
  messageList: [],
  setMessageList: (messageList: IMessageListData[]) =>
    set({ messageList: messageList }),
  resetMessageList: () => set({ messageList: [] }),
}))

export default useMessageListState
