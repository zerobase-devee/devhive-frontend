import { axiosBasic } from '@/apis'
import { kakaoTokenState } from '@/recoil/kakaoToken'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import LoginLoading from '@/components/auth/sns/LoginLoading'

const GoogleLogin = () => {
  const [loading, setLoading] = useState(true)
  const setToken = useSetRecoilState(kakaoTokenState)
  const router = useRouter()

  const handleGoogleLogin = async () => {
    const KAKAO_CODE = new URL(window.location.href).searchParams.get('code')
    console.log(KAKAO_CODE)

    if (KAKAO_CODE) {
      try {
        const res = await axiosBasic({
          baseURL: process.env.NEXT_PUBLIC_BASE_URL,
          method: 'get',
          url: `/oauth/redirect/kakao`,
          params: { authorizationCode: KAKAO_CODE },
        })
        console.log(res)
        // setLoading(false)
        // router.replace('/')
        return res.data

        // const userEmail = res.data.success.kakao_account.email

        // const checkUser = await axios.post('/api/users/check/email', {
        //   email: userEmail,
        // })

        // if (checkUser.data.isEmailExisted) {
        //   try {
        //     const tokenRes = await axios.post('/api/auth', {
        //       email: userEmail,
        //     })
        //     const { accessToken } = tokenRes.data
        //     setToken(accessToken)
        //     router.replace('/')
        //   } catch (error) {
        //     console.log(error)
        //   }
        // } else {
        //   console.error('error')
        // }
      } catch (error) {
        console.log(error)
      }
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGoogleLogin()
  }, [router, setToken])

  if (loading) {
    return <LoginLoading />
  }

  return null
}

export default GoogleLogin
