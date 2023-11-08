import styles from '@/styles/pages/oauth2Redirect.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoginLoading from '@/components/auth/sns/LoginLoading'
import { postRefreshToken } from '@/apis/auth/refreshToken'
import { useQueryClient } from 'react-query'
import { useCookies } from 'react-cookie'
import { TOKEN_MAX_AGE } from '@/constants/cookieMaxAge'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { loginUserInfoDataType } from '@/types/auth/userDataType'
import { loginUserInfo } from '@/recoil/loginUserInfo'
import { useSetRecoilState } from 'recoil'
import useSSE from '@/hooks/queries/useSSE'
import { GetServerSidePropsContext } from 'next'
import Container from '@/components/common/container/Container'
import LinkButton from '@/components/common/button/LinkButton'
import { FaUserTimes } from 'react-icons/fa'

const SNSLogin = ({ getRefreshToken }: { getRefreshToken: string | null }) => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(true)
  const [, setCookie] = useCookies()
  const router = useRouter()
  const setUserInfo = useSetRecoilState(loginUserInfo)
  const { startSSE } = useSSE()

  const handleSNSLogin = async () => {
    try {
      if (getRefreshToken) {
        const resData = await postRefreshToken(getRefreshToken)
        const { accessToken, refreshToken, userDto } = resData
        queryClient.setQueryData(REACT_QUERY_KEY.accessToken, accessToken)
        queryClient.setQueryData(REACT_QUERY_KEY.refreshToken, refreshToken)
        queryClient.setQueryData(REACT_QUERY_KEY.userInfo, userDto)
        setCookie('accessToken', accessToken, {
          path: '/',
          maxAge: TOKEN_MAX_AGE,
        })
        setCookie('refreshToken', refreshToken, {
          path: '/',
          maxAge: TOKEN_MAX_AGE,
        })
        const userInfo: loginUserInfoDataType = {
          userId: userDto.userId,
          profileImage: userDto.profileImage,
          role: userDto.role,
          nickName: userDto.nickName,
        }
        setCookie('userInfo', JSON.stringify(userInfo), {
          path: '/',
          maxAge: TOKEN_MAX_AGE,
        })
        setUserInfo(userInfo)
        startSSE(userDto.userId)
        router.push('/')
        setLoading(false)
      } else {
        setLoading(false)
      }
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

  return (
    <Container>
      <div className={styles.container}>
        <FaUserTimes />
        <p>
          퇴출전적으로 인해 <br /> 계정이 <span>비활성화</span>되었어요.
        </p>
        <LinkButton href="/" fill>
          메인으로
        </LinkButton>
      </div>
    </Container>
  )
}

export default SNSLogin

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { refreshToken } = context.query

  return {
    props: {
      getRefreshToken: refreshToken || null,
    },
  }
}
