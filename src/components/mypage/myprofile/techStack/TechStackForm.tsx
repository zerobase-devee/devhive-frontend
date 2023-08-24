import Button from '@/components/common/button/Button'
import styles from './techStackForm.module.css'
import TechStackSelectedBox from '@/components/techStack/techStackSelectedBox/TechStackSelectedBox'
import { useRecoilState } from 'recoil'
import { myprofileTechState } from '@/recoil/myprofleTechStack/atom'
import { techStackData } from 'public/data/techStackData'

interface TechStackProps {
  onClose: () => void
}

const TechStackForm = ({ onClose }: TechStackProps) => {
  const [selectedItems, setSelectedItems] = useRecoilState(myprofileTechState)

  const handleItemToggle = (id: number) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const onSubmit = () => {
    onClose()
    console.log('Form Data:', selectedItems)
  }

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <div className={styles.selectBoxArea}>
        <TechStackSelectedBox
          data={techStackData}
          selectedItems={selectedItems}
          handleItemToggle={handleItemToggle}
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
