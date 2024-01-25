import { create } from 'zustand'

interface IShowCaseState {
  content: string | undefined
  setContent: (newContent: string | undefined) => void
}

const useShowCaseState = create<IShowCaseState>((set) => ({
  content: '',
  setContent: (newContent: string | undefined) => set({ content: newContent }),
}))

export default useShowCaseState
