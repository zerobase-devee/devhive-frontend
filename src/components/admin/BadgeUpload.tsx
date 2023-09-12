import styles from './uploadForm.module.css'
import {
  AdminSendDataType,
  AdminUploadDataType,
  BadgeDataType,
} from '@/types/admin/adminDataType'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../common/button/Button'
import { imageFileConversion } from '@/apis/admin/imageFileConversion'
import { deleteBadge, postBadge } from '@/apis/admin/badge'
import { fetchData } from '@/utils/fetchData'

const BadgeUpload = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminUploadDataType>({
    mode: 'onChange',
  })

  const [badgeData, setBadgeData] = useState<BadgeDataType[]>([])
  useEffect(() => {
    fetchData('/admin/badges', setBadgeData)
  }, [])

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [deleteId, setDeleteId] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setDeleteId(newValue)
  }

  const HandleDelete = async () => {
    try {
      const num = Number(deleteId)
      await deleteBadge(num)
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async (data: AdminUploadDataType) => {
    try {
      if (imageFile) {
        const formData = new FormData()
        formData.append('image', imageFile)
        const image = await imageFileConversion(formData)
        const sendData: AdminSendDataType = {
          name: data.name,
          imageUrl: image,
        }
        await postBadge(sendData)
        reset()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>뱃지</h2>
      <div className={styles.inputArea}>
        <p>등록된 뱃지</p>
        {badgeData.map((item) => (
          <div key={item.id}>
            <span>id: {item.id} </span>
            <span>이름: {item.name}</span>
          </div>
        ))}
      </div>
      <div className={styles.inputArea}>
        <p>뱃지 이름</p>
        <input
          className={styles.inputText}
          type="text"
          {...register('name', {
            required: '뱃지 이름을 입력해주세요.',
          })}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>
      <div className={styles.inputArea}>
        <p>뱃지 이미지</p>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          {...register('image', {
            required: '뱃지 이미지를 등록해주세요.',
            onChange: (event) => {
              const file = event.target.files && event.target.files[0]
              setImageFile(file)
            },
          })}
        />
        {errors.image && <p className={styles.error}>{errors.image.message}</p>}
      </div>
      <div className={styles.inputArea}>
        <p>삭제 뱃지ID 입력</p>
        <input
          className={styles.inputText}
          type="text"
          value={deleteId}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.buttonArea}>
        <Button type="button" onClick={HandleDelete}>
          삭제
        </Button>
        <Button type="submit" fill>
          등록
        </Button>
      </div>
    </form>
  )
}

export default BadgeUpload
