import { BiSolidPencil } from 'react-icons/bi'
import styles from './careerList.module.css'
import { CareerData } from '@/types/mypageDataType'

interface CareerListProps {
  onClick: () => void
  careerDataList: CareerData[]
}

const CareerList = ({ onClick, careerDataList }: CareerListProps) => {
  return careerDataList.length === 0 ? (
    <></>
  ) : (
    <div className={styles.list}>
      {careerDataList.map((item: CareerData, index: number) => (
        <div className={styles.item} key={index}>
          <span className={styles.company}>{item.company}</span>
          <span>・</span>
          <span className={styles.position}>{item.position}</span>
          <span>・</span>
          <span>{item.startDate}</span>
          <span>~</span>
          <span>{item.endDate === '' ? '재직중' : item.endDate}</span>
          <button type="button" onClick={onClick}>
            <BiSolidPencil />
          </button>
        </div>
      ))}
    </div>
  )
}

export default CareerList
