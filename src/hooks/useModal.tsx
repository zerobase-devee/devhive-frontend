import { useEffect, useState } from 'react'

const useModal = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openModals, setOpenModals] = useState<{ [name: string]: boolean }>({})
  const [scrollPosition, setScrollPosition] = useState<number | null>(null)

  useEffect(() => {
    if (
      openModal === true ||
      Object.values(openModals).some((value) => value === true)
    ) {
      setScrollPosition(window.scrollY)
    } else {
      if (scrollPosition !== null) {
        window.scrollTo(0, scrollPosition)
        setScrollPosition(null)
      }
    }
  }, [openModal, openModals, scrollPosition])

  const handleOpenModal = () => {
    document.body.style.overflow = 'hidden'
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    document.body.style.overflow = 'auto'
    setOpenModal(false)
  }

  const handleOpenModals = (name: string) => {
    document.body.style.overflow = 'hidden'
    setOpenModals((prev) => ({
      ...prev,
      [name]: true,
    }))
  }

  const handleCloseModals = (name: string) => {
    document.body.style.overflow = 'auto'
    setOpenModals((prev) => ({
      ...prev,
      [name]: false,
    }))
  }

  return {
    openModal,
    setOpenModal,
    handleOpenModal,
    handleCloseModal,
    openModals,
    handleOpenModals,
    handleCloseModals,
  }
}

export default useModal
