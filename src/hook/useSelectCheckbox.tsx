import { useState } from 'react'

const useSelectCheckBox = () => {
  const [selectedSet, setSelectedSet] = useState(new Set())

  const selectAll = (allData: any) => {
    setSelectedSet(new Set(allData))
  }

  const selectOne = (id: any) => {
    if (selectedSet.has(id)) return
    const newSet = new Set(selectedSet)
    newSet.add(id)
    setSelectedSet(newSet)
  }

  const unselectAll = () => {
    setSelectedSet(new Set())
  }

  const unselectOne = (id: any) => {
    if (!selectedSet.has(id)) return
    const newSet = new Set(selectedSet)
    newSet.delete(id)
    setSelectedSet(newSet)
  }

  const toggleSelect = (id: any) => {
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
    selectAll,
    selectOne,
    unselectAll,
    unselectOne,
    toggleSelect,
  }
}

export default useSelectCheckBox
