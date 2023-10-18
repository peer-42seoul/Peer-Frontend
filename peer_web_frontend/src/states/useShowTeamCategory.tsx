import { create } from 'zustand'

interface IShowTeams {
  showTeamPageCategory: string
  setShowTeamPageCategory: (showTeamPageCategory: string) => void
}

const useShowTeamCategory = create<IShowTeams>((set) => ({
  showTeamPageCategory: '메인',
  setShowTeamPageCategory: (showTeamPageCategory: string) =>
    set({ showTeamPageCategory }),
}))

export default useShowTeamCategory
