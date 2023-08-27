import Button from '@/components/common/button/Button'
import styles from './techStackForm.module.css'
import TechStackSelectedBox from '@/components/techStack/techStackSelected/TechStackSelectedBox'
import { techStackData } from 'public/data/techStackData'
import { useState } from 'react'
import { handleItemToggle } from '@/utils/techStackToggle'
import TechStackSelectedList from '@/components/techStack/techStackSelected/TechStackSelectedList'
import useTechStack from '@/hooks/useTechStack'

interface TechStackProps {
  onClose: () => void
}

const TechStackForm = ({ onClose }: TechStackProps) => {
  const { handleItemToggle, selectedItems } = useTechStack()

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
        <TechStackSelectedList
          data={techStackData}
          selectedItems={selectedItems}
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
