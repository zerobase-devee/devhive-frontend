import styles from './techStackSelected.module.css'
import TechStackCard from '../techStackCard/TechStackCard'
import { TechStackDataType } from '@/types/admin/adminDataType'

interface TechStackSelectedListProps {
  data: TechStackDataType[]
  selectedItems: TechStackDataType[]
}

const TechStackSelectedList = ({
  selectedItems,
  data,
}: TechStackSelectedListProps) => {
  return selectedItems.length === 0 ? (
    <div className={styles.selectedList}>
      <p>아직 선택한 기술 스택이 없어요.</p>
    </div>
  ) : (
    <div className={styles.selectedList}>
      {selectedItems.map((selected: TechStackDataType) => {
        const selectedItem = data.find((item) => item.id === selected.id)
        if (selectedItem) {
          return (
            <TechStackCard
              key={selectedItem.id}
              name={selectedItem.name}
              imageUrl={selectedItem.image}
            />
          )
        } else {
          return null
        }
      })}
    </div>
  )
}

export default TechStackSelectedList
