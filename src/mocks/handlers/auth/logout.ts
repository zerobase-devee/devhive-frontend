import { rest } from 'msw'

const logoutHandler = rest.post('/api/auth/signout', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      accessToken: null,
      refreshToken: null,
    }),
  )
})

export default logoutHandler
