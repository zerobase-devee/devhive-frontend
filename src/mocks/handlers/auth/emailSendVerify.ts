import { rest } from 'msw'

const emailSendVerifyHandler = rest.post(
  '/api/auth/verify/send',
  (req, res, ctx) => {
    return res(ctx.status(200))
  },
)

export default emailSendVerifyHandler
