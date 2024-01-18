import { create } from 'zustand'

interface IShowCaseState {
  content: string
  setContent: (newContent: string) => void
}

const useShowCaseState = create<IShowCaseState>((set) => ({
  content: '',
  setContent: (newContent: string) => set({ content: newContent }),
}))

export default useShowCaseState
