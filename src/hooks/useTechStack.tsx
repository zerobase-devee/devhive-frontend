import { TechStackDataType } from '@/types/admin/adminDataType'
import {
  getSessionStorage,
  setSessionStorage,
} from '@/utils/saveSessionStorage'
import { useEffect, useState } from 'react'

const useTechStack = (defaults: TechStackDataType[]) => {
  const [selectedItems, setSelectedItems] = useState<TechStackDataType[]>([])

  useEffect(() => {
    const getTechStack = getSessionStorage('techStack')
    if (getTechStack) {
      setSelectedItems(getTechStack)
    } else if (defaults) {
      setSelectedItems(defaults)
    } else {
      setSelectedItems([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleItemToggle = (seletedItem: TechStackDataType) => {
    setSelectedItems((prev) => {
      const isItemInPrev = prev.some((item) => item.id === seletedItem.id)
      if (isItemInPrev) {
        return prev.filter((item) => item.id !== seletedItem.id)
      } else {
        return [...prev, seletedItem]
      }
    })
  }

  const handleTechStackSave = (seletedItem: TechStackDataType) => {
    setSelectedItems((prev) => {
      const isItemInPrev = prev.some((item) => item.id === seletedItem.id)
      const updatedItems = isItemInPrev
        ? prev.filter((item) => item.id !== seletedItem.id)
        : [...prev, seletedItem]

      setSessionStorage(updatedItems, 'techStack')
      return updatedItems
    })
  }

  return { selectedItems, handleItemToggle, handleTechStackSave }
}

export default useTechStack
