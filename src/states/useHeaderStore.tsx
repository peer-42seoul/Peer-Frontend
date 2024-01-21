import { create } from 'zustand'

interface IHedaerStore {
  headerTitle: string
  setHeaderTitle: (title: string) => void
}

const useHeaderStore = create<IHedaerStore>((set) => {
  return {
    headerTitle: '',
    setHeaderTitle: (title) => {
      set(() => ({
        headerTitle: title,
      }))
    },
  }
})

export default useHeaderStore
