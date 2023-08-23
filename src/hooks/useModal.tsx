import { useState } from 'react'

const useModal = () => {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
    document.body.classList.add('modalOpen')
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    document.body.classList.remove('modalOpen')
  }

  return {
    openModal,
    setOpenModal,
    handleOpenModal,
    handleCloseModal,
  }
}

export default useModal
