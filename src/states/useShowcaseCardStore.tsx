import { ICardData } from '@/app/showcase/panel/types'
import { create } from 'zustand'

import axios from 'axios'

interface IShowcaseStore {
  showcases: ICardData[]
  draggedCardList: ICardData[]
  page: number
  index: number
  setShowcases: (showcases: ICardData[]) => void
  setDraggedCardList: (draggedCardList: ICardData[]) => void
  getShowcases: (page: number) => void
  removeShowcase: () => void
  nextShowcase: () => void
  prevShowcase: () => void
  resetShowcases: () => void
}

const useShowcaseStore = create<IShowcaseStore>((set, get) => {
  return {
    showcases: [],
    draggedCardList: [],
    page: 1,
    index: 0,
    setShowcases: (showcases: ICardData[]) => {
      set(() => ({ showcases: showcases }))
    },
    setDraggedCardList: (draggedCardList: ICardData[]) => {
      set(() => ({ draggedCardList: draggedCardList }))
    },

    getShowcases: (page: number) => {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/showcase?page=${page}&pageSize=10`,
        )
        .then((res) => {
          const oldShowcases = get().showcases
          const newShowcases = [...oldShowcases]
            .reverse()
            .concat(res.data.content)
          set(() => ({ showcases: newShowcases, page: page }))
        })
    },

    removeShowcase: () => {
      const oldShowcases = get().showcases
      const oldLength = oldShowcases.length
      if (oldShowcases.length > 1) {
        oldShowcases.push(oldShowcases[oldLength - 1])
      }
    },
    nextShowcase: () => {},
    prevShowcase: () => {},
    resetShowcases: () => {},
  }
})

export default useShowcaseStore
