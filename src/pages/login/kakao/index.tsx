import Home from '@/pages'
import { kakaoTokenState } from '@/recoil/kakaoToken'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'

const KakaoLogin = () => {
  const [loading, setLoading] = useState(true)
  const setToken = useSetRecoilState(kakaoTokenState)
  const router = useRouter()

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const KAKAO_CODE = new URL(window.location.href).searchParams.get('code')

      if (KAKAO_CODE) {
        try {
          const res = await axios.post('/api/auth/kakao', null, {
            params: { authorizationCode: KAKAO_CODE },
          })
          const userEmail = res.data.success.kakao_account.email

          const checkUser = await axios.post('/api/users/check/email', {
            email: userEmail,
          })

          if (checkUser.data.isEmailExisted) {
            try {
              const tokenRes = await axios.post('/api/auth', {
                email: userEmail,
              })
              const { accessToken } = tokenRes.data
              setToken(accessToken)
              router.replace('/')
            } catch (error) {
              console.log(error)
            }
          } else {
            console.error('error')
          }

          setLoading(false)
        } catch (error) {
          console.log(error)
        }
      } else {
        setLoading(false)
      }

      handleKakaoLogin()
    }
  }, [])

  if (loading) {
    return <div>로딩중...</div>
  }

  return <Home />
}

export default KakaoLogin
