import Button from '@/components/common/button/Button'
import styles from './techStackForm.module.css'
import TechStackSelectedBox from '@/components/techStack/techStackSelected/TechStackSelectedBox'
import TechStackSelectedList from '@/components/techStack/techStackSelected/TechStackSelectedList'
import useTechStack from '@/hooks/useTechStack'
import { useEffect, useState } from 'react'
import { TechStackDataType } from '@/types/admin/adminDataType'
import { fetchData } from '@/utils/fetchData'
import { useQuery } from 'react-query'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { useRecoilValue } from 'recoil'
import { loginUserInfo } from '@/recoil/loginUserInfo'
import Loading from '@/components/common/loading/Loading'
import useQueryTechStack from '@/hooks/queries/useTechStack'
import { useForm } from 'react-hook-form'

interface TechStackProps {
  onClose: () => void
}

const TechStackForm = ({ onClose }: TechStackProps) => {
  const userInfo = useRecoilValue(loginUserInfo)
  const userId = userInfo.userId

  const { data, error, isLoading } = useQuery<TechStackDataType[]>(
    REACT_QUERY_KEY.loginUserTechStack,
    () => fetchData(`/users/${userId}/tech-stacks`),
  )

  const {
    handleItemToggle,
    selectedItems,
    setSelectedTechStacks,
    selectedTechStacks,
  } = useTechStack(data || [])
  const [techStackData, setTechStackData] = useState<TechStackDataType[]>()
  const { editTechStack } = useQueryTechStack()

  useEffect(() => {
    fetchData('/admin/tech-stacks', setTechStackData)
  }, [])

  const { handleSubmit } = useForm<TechStackDataType[]>()

  if (!techStackData) {
    return null
  }

  if (error) {
    return <div>에러</div>
  }

  if (isLoading) {
    return <Loading />
  }

  const onSubmit = async () => {
    await editTechStack.mutateAsync(selectedItems)
    onClose()
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.selectBoxArea}>
        <TechStackSelectedBox
          selectedTechStacks={selectedTechStacks}
          setSelectedTechStacks={setSelectedTechStacks}
          techStackData={techStackData}
          selectedItems={selectedItems}
          handleItemToggle={handleItemToggle}
          scroll
        />
        <TechStackSelectedList
          data={techStackData}
          selectedItems={selectedTechStacks}
        />
      </div>
      <div className={styles.buttonArea}>
        <Button type="button" onClick={onClose}>
          취소
        </Button>
        <Button type="submit" fill>
          저장
        </Button>
      </div>
    </form>
  )
}

export default TechStackForm
