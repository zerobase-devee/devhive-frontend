import { BiSolidPencil } from 'react-icons/bi'
import styles from './careerList.module.css'
import { GetCareersDataType } from '@/types/users/careerDataType'
import { formatDateToYYYYMMDD } from '@/utils/formatDate'
import { MdDelete } from 'react-icons/md'
import React, { useState } from 'react'
import CareerForm from './CareerForm'
import { useRecoilValue } from 'recoil'
import { loginUserInfo } from '@/recoil/loginUserInfo'
import { deleteCareers } from '@/apis/mypage/careers'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchReactQueryData } from '@/utils/fetchReactQueryData'
import InfoModal from '@/components/common/modal/InfoModal'
import useModal from '@/hooks/useModal'
import Loading from '@/components/common/loading/Loading'
import useCareer from '@/hooks/useCareer'

interface CareerListProps {
  view?: boolean
}

const CareerList = ({ view }: CareerListProps) => {
  const userInfo = useRecoilValue(loginUserInfo)
  const userId = userInfo.userId
  const { data, error, isLoading } = useQuery<GetCareersDataType[]>(
    'loginUserCareer',
    () => fetchReactQueryData(`/users/${userId}/careers`),
  )
  const { deleteCareerMutation } = useCareer()
  const [editingItem, setEditingItem] = useState<number | null>(null)
  const { handleCloseModal } = useModal()

  if (error) {
    return (
      <InfoModal onClick={handleCloseModal} buttonText="확인">
        에러가 발생했습니다.
        <br /> 새로고침 해주세요.
      </InfoModal>
    )
  }

  if (!data) {
    return null
  }

  if (isLoading) {
    return <Loading />
  }

  const toggleEditing = (careerId: number) => {
    if (editingItem === careerId) {
      setEditingItem(null)
    } else {
      setEditingItem(careerId)
    }
  }

  const handleDeleteCareer = (careerId: number) => {
    deleteCareerMutation.mutate(careerId)
  }

  return data.length === 0 ? null : (
    <div className={`${view ? styles.view : styles.list}`}>
      {data.map((item: GetCareersDataType) => (
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
                      handleDeleteCareer(item.careerId)
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
