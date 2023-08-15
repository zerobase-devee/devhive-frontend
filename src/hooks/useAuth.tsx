'use client'

import { useState } from 'react'

interface ShowPasswordState {
  password: boolean
  passwordConfirm: boolean
}

const useAuth = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    authNumber: '',
    password: '',
    passwordConfirm: '',
    name: '',
    nickname: '',
  })

  const [showPassword, setShowPassword] = useState<ShowPasswordState>({
    password: false,
    passwordConfirm: false,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  const handleEmailReset = () => {
    setInputValue({
      ...inputValue,
      email: '',
    })
  }

  const toggleShowPassword = (field: keyof ShowPasswordState) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }))
  }

  return {
    inputValue,
    setInputValue,
    onChange,
    showPassword,
    handleEmailReset,
    toggleShowPassword,
  }
}

export default useAuth
