import { onLogin } from '@/pages/apis/auth/loginApi'
import { useMutation } from 'react-query'

const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => onLogin(data),
  })

  return { loginMutation }
}

export default useLogin
