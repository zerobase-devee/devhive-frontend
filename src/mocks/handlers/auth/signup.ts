import { rest } from 'msw'
import { SignupDataType } from '@/types/auth/signupDataType'

const signupHandler = rest.post<SignupDataType>(
  '/api/auth/signup',
  (req, res, ctx) => {
    const { email, password, repassword, nickname } = req.body
    if (
      email === 'leeahreum99@naver.com' &&
      password === 'qwer1234!' &&
      repassword === 'qwer1234!' &&
      nickname === '야호'
    ) {
      return res(ctx.status(200), ctx.json(true))
    } else {
      return res(ctx.status(400), ctx.json(false))
    }
  },
)

export default signupHandler
