import { useState } from 'react'

interface ShowPasswordState {
  password: boolean
  passwordConfirm: boolean
  currentPassword: boolean
  newPassword: boolean
  newPasswordConfirm: boolean
}

const useShowPassword = () => {
  const [showPassword, setShowPassword] = useState<ShowPasswordState>({
    password: false,
    passwordConfirm: false,
    currentPassword: false,
    newPassword: false,
    newPasswordConfirm: false,
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
