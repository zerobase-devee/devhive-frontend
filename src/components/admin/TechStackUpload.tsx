import styles from './uploadForm.module.css'
import {
  AdminSendDataType,
  AdminUploadDataType,
  TechStackDataType,
} from '@/types/admin/adminDataType'
import { useForm } from 'react-hook-form'
import Button from '../common/button/Button'
import { imageFileConversion } from '@/apis/admin/imageFileConversion'
import { postTechStack, deleteTechStack } from '@/apis/admin/techStack'
import { ChangeEvent, useEffect, useState } from 'react'
import useTechStack from '@/hooks/useTechStack'
import TechStackSelectedBox from '../techStack/techStackSelected/TechStackSelectedBox'
import { fetchData } from '@/utils/fetchData'

const TechStackUpload = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminUploadDataType>({
    mode: 'onChange',
  })

  const [techStackData, setTechStackData] = useState<TechStackDataType[]>([])
  useEffect(() => {
    fetchData('/admin/tech-stacks', setTechStackData)
  }, [])

  const {
    selectedItems,
    selectedTechStacks,
    handleTechStackSave,
    setSelectedTechStacks,
  } = useTechStack([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [deleteId, setDeleteId] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setDeleteId(newValue)
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
        await postTechStack(sendData)
        reset()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const HandleDelete = async () => {
    try {
      const num = Number(deleteId)
      await deleteTechStack(num)
      setDeleteId('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>기술스택</h2>
      <div className={styles.inputArea}>
        <p>등록된 기술스택 목록</p>
        <TechStackSelectedBox
          selectedTechStacks={selectedTechStacks}
          setSelectedTechStacks={setSelectedTechStacks}
          scroll
          techStackData={techStackData}
          selectedItems={selectedItems}
          handleItemToggle={handleTechStackSave}
        />
      </div>
      <div className={styles.inputArea}>
        <p>기술스택 이름</p>
        <input
          className={styles.inputText}
          type="text"
          {...register('name', {
            required: '기술스택이름을 입력해주세요.',
          })}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>
      <div className={styles.inputArea}>
        <p>기술스택 이미지</p>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          {...register('image', {
            required: '기술스택 이미지를 등록해주세요.',
            onChange: (event) => {
              const file = event.target.files && event.target.files[0]
              setImageFile(file)
            },
          })}
        />
        {errors.image && <p className={styles.error}>{errors.image.message}</p>}
      </div>
      <div className={styles.inputArea}>
        <p>삭제 기술스택ID 입력</p>
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

export default TechStackUpload
