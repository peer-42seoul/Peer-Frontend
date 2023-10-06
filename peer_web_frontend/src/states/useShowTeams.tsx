import { create } from 'zustand'

interface IShowTeams {
  showTeams: string
  setShowTeams: (showTeams: string) => void
}

const useShowTeams = create<IShowTeams>((set) => ({
  showTeams: '모집 중',
  setShowTeams: (showTeams: string) => set({ showTeams }),
}))

export default useShowTeams
