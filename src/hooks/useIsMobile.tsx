import { useEffect, useState } from 'react'

const useIsMobile = () => {
  const [windowWidth, setWindowWidth] = useState(0)
  const resizeWindow = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    window.addEventListener('resize', resizeWindow)
    return () => {
      window.removeEventListener('resize', resizeWindow)
    }
  }, [windowWidth])

  const isMobile = windowWidth <= 768

  return isMobile
}

export default useIsMobile
