import { useState } from 'react'

const useTechStack = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const handleItemToggle = (id: number) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  return { selectedItems, handleItemToggle }
}

export default useTechStack
