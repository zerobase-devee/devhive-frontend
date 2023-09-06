import { BiSolidPencil } from 'react-icons/bi'
import styles from './careerList.module.css'
import { GetCareersDataType } from '@/types/users/career'
import { formatDateToYYYYMMDD } from '@/utils/formatDate'
import { MdDelete } from 'react-icons/md'
import { careersDelete } from '@/apis/mypage/careersDelete'
import React, { useEffect, useState } from 'react'
import CareerForm from './CareerForm'
import { useRecoilValue } from 'recoil'
import { loginUserId } from '@/recoil/loginUserId'
import { fetchData } from '@/utils/fetchData'
import { useRouter } from 'next/navigation'

interface CareerListProps {
  view?: boolean
}

const CareerList = ({ view }: CareerListProps) => {
  const router = useRouter()
  const [editingItem, setEditingItem] = useState<number | null>(null)
  const [careerData, setCareerData] = useState<GetCareersDataType[]>([])
  const userId = useRecoilValue(loginUserId)

  useEffect(() => {
    if (!userId) {
      return
    } else {
      fetchData(`/users/${userId}/careers`, setCareerData)
      return
    }
  }, [userId])

  const toggleEditing = (careerId: number) => {
    if (editingItem === careerId) {
      setEditingItem(null)
    } else {
      setEditingItem(careerId)
    }
  }
  const deleteCareer = async (careerId: number) => {
    try {
      await careersDelete(careerId)
      router.refresh()
    } catch (error: any) {
      console.error(error.response)
    }
  }

  return careerData.length === 0 ? null : (
    <div className={`${view ? styles.view : styles.list}`}>
      {careerData.map((item: GetCareersDataType) => (
        <React.Fragment key={item.careerId}>
          {editingItem === item.careerId ? (
            <CareerForm
              careerId={item.careerId}
              modify
              onClose={() => toggleEditing(item.careerId)}
              companyData={item.company}
              positionData={item.position}
              startDateData={formatDateToYYYYMMDD(item.startDate)}
              endDateData={
                item.endDate ? formatDateToYYYYMMDD(item.endDate) : ''
              }
            />
          ) : (
            <div className={styles.item} key={item.careerId}>
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
                <div className={styles.buttonArea}>
                  <button
                    type="button"
                    onClick={() => {
                      deleteCareer(item.careerId)
                    }}
                  >
                    <MdDelete />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleEditing(item.careerId)}
                  >
                    <BiSolidPencil />
                  </button>
                </div>
              )}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default CareerList
