import create from 'zustand'

interface IAdminStore {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const useAdminStore = create<IAdminStore>((set) => {
  return {
    isLoggedIn: false,
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false }),
  }
})

export default useAdminStore
