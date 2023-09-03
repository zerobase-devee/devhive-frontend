import { rest } from 'msw'

const loginHandler = rest.post('/api/auth/signin', (_req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      accessToken: 'asdqwe123',
      refreshToken: 'qweasd',
    }),
  )
})

export default loginHandler
