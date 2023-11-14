import { useState } from 'react'

const useSelectCheckBox = <T,>(initalSet: Set<T>) => {
  const [selectedSet, setSelectedSet] = useState<any>(initalSet)

  const isSelectedAll = (allData: Array<any>) => {
    return allData.length === selectedSet.size
  }

  const selectAll = (allData: Array<T>) => {
    setSelectedSet(new Set(allData))
  }

  const unselectAll = () => {
    setSelectedSet(new Set())
  }

  const toggleSelect = (id: T) => {
    const newSet = new Set(selectedSet)
    if (newSet.has(id)) {
      newSet.delete(id)
      setSelectedSet(newSet)
    } else {
      newSet.add(id)
      setSelectedSet(newSet)
    }
  }

  return {
    selectedSet,
    isSelectedAll,
    selectAll,
    unselectAll,
    toggleSelect,
  }
}

export default useSelectCheckBox
