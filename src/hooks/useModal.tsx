'use client'

import { useState } from 'react'

const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
    document.body.classList.add('modalOpen')
  }

  const closeModal = () => {
    setModalOpen(false)
    document.body.classList.remove('modalOpen')
  }

  return { modalOpen, setModalOpen, openModal, closeModal }
}

export default useModal
