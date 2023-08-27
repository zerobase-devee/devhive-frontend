export const handleItemToggle = (
  id: number,
  setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  setSelectedItems((prev) => {
    if (prev.includes(id)) {
      return prev.filter((item) => item !== id)
    } else {
      return [...prev, id]
    }
  })
}
