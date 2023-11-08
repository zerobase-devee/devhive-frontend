import styles from './tabs.module.css'
import { useState, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface TabProps {
  readonly tabMenu: string[]
  readonly tabContents: React.ReactNode[]
}

const Tabs = ({ tabMenu, tabContents }: TabProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [selectedTab, setSelectedTab] = useState<null | number>(null)

  useEffect(() => {
    const tabParams = searchParams.get('tab')
    if (!tabParams) {
      return
    }
    const tabIndex = tabMenu.findIndex((item) => item === tabParams)
    if (tabIndex < 0) {
      return
    }
    setSelectedTab(tabIndex)
  }, [searchParams, tabMenu])

  const handleTabClick = (index: number, item: string[]) => {
    setSelectedTab(index)
    const queryString = new URLSearchParams()
    queryString.set('tab', item[index])
    router.push(pathname + '?' + queryString.toString())
  }

  return (
    <>
      <div className={styles.tabContainer}>
        {tabMenu.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleTabClick(index, tabMenu)}
            className={`${styles.tabItem} ${
              selectedTab === index && styles.selected
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <>
        {tabContents.map((item, index) => (
          <div
            className={`${selectedTab === index ? '' : styles.hidden}`}
            key={index}
          >
            {item}
          </div>
        ))}
      </>
    </>
  )
}

export default Tabs
