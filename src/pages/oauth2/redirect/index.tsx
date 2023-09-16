import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoginLoading from '@/components/auth/sns/LoginLoading'
import useLogin from '@/hooks/queries/useLogin'
import axios from 'axios'

const SNSLogin = () => {
  const [loading, setLoading] = useState(true)
  const { refreshTokenMutation } = useLogin()

  const router = useRouter()

  const handleSNSLogin = async () => {
    try {
      setLoading(false)

      router.replace('/')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleSNSLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <LoginLoading />
  }

  return null
}

export default SNSLogin
