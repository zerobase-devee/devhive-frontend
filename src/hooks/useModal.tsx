import { useState } from 'react'

const useModal = () => {
  // 모달 한개
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
    document.body.classList.add('modalOpen')
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    document.body.classList.remove('modalOpen')
  }

  // 모달 여러개
  const [openModals, setOpenModals] = useState<{ [name: string]: boolean }>({})
  const handleOpenModals = (name: string) => {
    document.body.classList.add('modalOpen')
    setOpenModals((prev) => ({
      ...prev,
      [name]: true,
    }))
  }

  const handleCloseModals = (name: string) => {
    document.body.classList.remove('modalOpen')
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
