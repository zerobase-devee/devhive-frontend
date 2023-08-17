'use client'

import { useState } from 'react'

interface ShowPasswordState {
  password: boolean
  passwordConfirm: boolean
}

const useShowPassword = () => {
  const [showPassword, setShowPassword] = useState<ShowPasswordState>({
    password: false,
    passwordConfirm: false,
  })

  const toggleShowPassword = (field: keyof ShowPasswordState) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }))
  }

  return {
    showPassword,
    toggleShowPassword,
  }
}

export default useShowPassword
