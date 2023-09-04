import { rest } from 'msw'
import { mypageData } from 'public/data/mypage/myProfileData'

const myprofileHandler = rest.get('/api/users/my-profile', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(mypageData))
})

export default myprofileHandler
