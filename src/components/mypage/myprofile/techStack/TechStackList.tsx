import { TechStackDataType } from '@/types/mypageDataType'
import styles from './techStackList.module.css'
import TechStackCard from '@/components/techStack/techStackCard/TechStackCard'

const TechStackList = ({
  techStackData,
}: {
  techStackData: TechStackDataType[]
}) => {
  return techStackData.length === 0 ? null : (
    <div className={styles.techStackList}>
      {techStackData.map((item: TechStackDataType) => (
        <TechStackCard
          key={item.id}
          name={item.name}
          imageUrl={item.imageUrl}
        />
      ))}
    </div>
  )
}

export default TechStackList
