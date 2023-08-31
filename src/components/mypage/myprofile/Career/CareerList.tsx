import { BiSolidPencil } from 'react-icons/bi'
import styles from './careerList.module.css'
import { CareerDataType } from '@/types/mypageDataType'

interface CareerListProps {
  onClick?: () => void
  careerDataList: CareerDataType[]
  view?: boolean
}

const CareerList = ({ onClick, careerDataList, view }: CareerListProps) => {
  return careerDataList.length === 0 ? null : (
    <div className={`${view ? styles.view : styles.list}`}>
      {careerDataList.map((item: CareerDataType, index: number) => (
        <div className={styles.item} key={index}>
          <span className={styles.company}>{item.company}</span>
          <span>・</span>
          <span className={styles.position}>{item.position}</span>
          <span>・</span>
          <span>{item.startDate}</span>
          <span>~</span>
          <span>{item.endDate === '' ? '재직중' : item.endDate}</span>
          {!view && (
            <button type="button" onClick={onClick}>
              <BiSolidPencil />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default CareerList
