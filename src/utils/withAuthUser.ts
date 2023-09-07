import { GetServerSideProps, GetServerSidePropsContext } from 'next'

export const withAuthUser = (getServerSidePropsFunc?: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context
    const accessToken = req.cookies.accessToken || null
    const refreshToken = req.cookies.refreshToken || null
    const isLogin = accessToken !== null && refreshToken !== null ? true : false
    const userInfo = req.cookies.userInfo || null
    const parsedUserInfo = userInfo ? JSON.parse(userInfo) : ''

    let result = { initialAuth: isLogin, initialUserInfo: parsedUserInfo }

    if (getServerSidePropsFunc) {
      const additionalProps = await getServerSidePropsFunc(context)
      if ('props' in additionalProps) {
        result = { ...result, ...additionalProps.props }
      }
    }

    return {
      props: result,
    }
  }
}
