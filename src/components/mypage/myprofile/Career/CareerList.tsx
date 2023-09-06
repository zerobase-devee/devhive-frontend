import { BiSolidPencil } from 'react-icons/bi'
import styles from './careerList.module.css'

import { CareersDataType } from '@/types/users/career'
import { formatDateToYYYYMMDD } from '@/utils/formatDate'

interface CareerListProps {
  onClick?: () => void
  view?: boolean
  careerData: CareersDataType[]
}

const CareerList = ({ onClick, view, careerData }: CareerListProps) => {
  return careerData.length === 0 ? null : (
    <div className={`${view ? styles.view : styles.list}`}>
      {careerData.map((item: CareersDataType, index: number) => (
        <div className={styles.item} key={index}>
          <span className={styles.company}>{item.company}</span>
          <span>・</span>
          <span className={styles.position}>{item.position}</span>
          <span>・</span>
          <span>{formatDateToYYYYMMDD(item.startDate)}</span>
          <span>~</span>
          <span>
            {item.endDate === null
              ? '재직중'
              : formatDateToYYYYMMDD(item.startDate)}
          </span>
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
