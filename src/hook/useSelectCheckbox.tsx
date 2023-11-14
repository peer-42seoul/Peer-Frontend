import { useState } from 'react'

const useSelectCheckBox = <T,>(initalSet: Set<T>) => {
  const [selectedSet, setSelectedSet] = useState<any>(initalSet)

  const isSelectedAll = (allData: Array<any>) => {
    return allData.length === selectedSet.size
  }

  const selectAll = (allData: Array<T>) => {
    setSelectedSet(new Set(allData))
  }

  const selectOne = (id: T) => {
    if (selectedSet.has(id)) return
    const newSet = new Set(selectedSet)
    newSet.add(id)
    setSelectedSet(newSet)
  }

  const unselectAll = () => {
    setSelectedSet(new Set())
  }

  const unselectOne = (id: T) => {
    if (!selectedSet.has(id)) return
    const newSet = new Set(selectedSet)
    newSet.delete(id)
    setSelectedSet(newSet)
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
    selectOne,
    unselectAll,
    unselectOne,
    toggleSelect,
  }
}

export default useSelectCheckBox
