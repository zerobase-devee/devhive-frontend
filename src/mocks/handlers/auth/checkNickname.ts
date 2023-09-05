import { rest } from 'msw'

type checkNickname = {
  nickname: string
}

const checkNicknameHandler = rest.get<checkNickname>(
  '/api/auth/check-nickname',
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(true))
  },
)

export default checkNicknameHandler
