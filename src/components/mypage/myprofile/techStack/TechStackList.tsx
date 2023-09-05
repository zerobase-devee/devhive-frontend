import { TechStackDataType } from '@/types/mypageDataType'
import styles from './techStackList.module.css'
import TechStackCard from '@/components/techStack/techStackCard/TechStackCard'

const TechStackList = ({
  techStackData,
  view,
}: {
  techStackData: TechStackDataType[]
  view?: boolean
}) => {
  return techStackData.length === 0 ? null : (
    <div className={`${view ? styles.view : styles.techStackList}`}>
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
