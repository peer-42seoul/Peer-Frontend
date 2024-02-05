import { TeamStatus } from '@/app/teams/types/types'
import { create } from 'zustand'

interface IShowTeams {
  showTeams: string
  setShowTeams: (showTeams: string) => void
}

const useShowTeams = create<IShowTeams>((set) => ({
  showTeams: TeamStatus.RECRUITING,
  setShowTeams: (showTeams: string) => set({ showTeams }),
}))

export default useShowTeams
