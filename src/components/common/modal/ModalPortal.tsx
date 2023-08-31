import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return mounted ? (
    createPortal(children, document.getElementById('modalRoot') as HTMLElement)
  ) : (
    <></>
  )
}

export default ModalPortal
