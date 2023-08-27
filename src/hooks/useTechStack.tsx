import {
  getSessionStorage,
  setSessionStorage,
} from '@/utils/saveSessionStorage'
import { useEffect, useState } from 'react'

const useTechStack = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  useEffect(() => {
    const getTechStack = getSessionStorage('techStack')
    if (!getTechStack) {
      return setSelectedItems([])
    } else {
      setSelectedItems(getTechStack)
    }
  }, [setSelectedItems])

  const handleItemToggle = (id: number) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleTechStackSave = (id: number) => {
    setSelectedItems((prev) => {
      const updatedItems = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]

      setSessionStorage(updatedItems, 'techStack')
      return updatedItems
    })
  }

  return { selectedItems, handleItemToggle, handleTechStackSave }
}

export default useTechStack
