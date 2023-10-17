import { create } from 'zustand'

interface IShowTeams {
  showTeamPageCategory: string
  setShowTeamPageCategory: (showTeamPageCategory: string) => void
}

const useShowTeamCategory = create<IShowTeams>((set) => ({
  showTeamPageCategory: '모집 중',
  setShowTeamPageCategory: (showTeamPageCategory: string) =>
    set({ showTeamPageCategory }),
}))

export default useShowTeamCategory
