import { rest } from 'msw'

type emailCheck = {
  email: string
  verificationCode: string
}

const emailCheckVerifyHandler = rest.post<emailCheck>(
  '/api/auth/verify/check',
  (req, res, ctx) => {
    const { email, verificationCode } = req.body
    if (email === 'leeahreum99@naver.com' && verificationCode === '7I7BN0p3') {
      return res(ctx.status(200), ctx.json(true))
    } else {
      return res(ctx.status(400), ctx.json(false))
    }
  },
)

export default emailCheckVerifyHandler
