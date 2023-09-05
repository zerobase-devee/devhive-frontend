import { rest } from 'msw'

type refreshToken = {
  refreshToken: string
}

const refreshTokenHandler = rest.post<refreshToken>(
  '/api/auth/refresh',
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json('newToken123'))
  },
)

export default refreshTokenHandler
