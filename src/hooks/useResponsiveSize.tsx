import { useEffect, useState } from 'react'

const useResponsiveSize = () => {
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

  const isTablet = windowWidth <= 768
  const isMobile = windowWidth <= 480

  return { isMobile, isTablet }
}

export default useResponsiveSize
