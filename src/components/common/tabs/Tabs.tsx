'use client'

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
  const [selectedTab, setSelectedTab] = useState(0)

  useEffect(() => {
    const tabParams = searchParams.get('tab')
    if (tabParams !== null) {
      const tabIndex = tabMenu.findIndex((item) => item === tabParams)
      if (tabIndex !== -1) {
        setSelectedTab(tabIndex)
      }
    }
  }, [searchParams, tabMenu, selectedTab])

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
      <div>
        <>
          {tabContents.map((item, index) => (
            <div
              key={index}
              className={`${selectedTab === index ? '' : styles.hidden}`}
            >
              {item}
            </div>
          ))}
        </>
      </div>
    </>
  )
}

export default Tabs
