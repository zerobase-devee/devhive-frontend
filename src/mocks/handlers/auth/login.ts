import { rest } from 'msw'

type LoginRequest = {
  email: string
  password: string
}

const loginHandler = rest.post<LoginRequest>(
  '/api/auth/signin',
  (req, res, ctx) => {
    const { email, password } = req.body
    if (email === 'leeahreum99@naver.com' && password === 'qwer1234!') {
      return res(
        ctx.status(200),
        ctx.json({
          accessToken: 'asdqwe123',
          refreshToken: 'qweasd',
        }),
      )
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          status: 400,
          errorCode: 'authentication_failed',
          message:
            '이메일 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요.',
        }),
      )
    }
  },
)

export default loginHandler
