import { BiSolidPencil } from 'react-icons/bi'
import styles from './careerList.module.css'
import { GetCareersDataType } from '@/types/users/careerDataType'
import { formatDateToYYYYMMDD } from '@/utils/formatDate'
import { MdDelete } from 'react-icons/md'
import React, { useState } from 'react'
import CareerForm from './CareerForm'
import { useRecoilValue } from 'recoil'
import { loginUserInfo } from '@/recoil/loginUserInfo'
import { useQuery } from 'react-query'
import InfoModal from '@/components/common/modal/InfoModal'
import useModal from '@/hooks/useModal'
import Loading from '@/components/common/loading/Loading'
import useCareer from '@/hooks/queries/useCareer'
import { fetchData } from '@/utils/fetchData'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'

interface CareerListProps {
  readonly view?: boolean
  readonly viewUserId?: number
}

const CareerList = ({ view, viewUserId }: CareerListProps) => {
  const userInfo = useRecoilValue(loginUserInfo)
  const userId = viewUserId ? viewUserId : userInfo.userId
  const { data, error, isLoading } = useQuery<GetCareersDataType[]>(
    REACT_QUERY_KEY.loginUserCareer,
    () => fetchData(`/users/${userId}/careers`),
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

  return data.length === 0 ? (
    view ? (
      <div className={styles.view}>
        <p className={styles.null}>아직 등록된 경력이 없어요.</p>
      </div>
    ) : null
  ) : (
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
                  : formatDateToYYYYMMDD(item.endDate)}
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
