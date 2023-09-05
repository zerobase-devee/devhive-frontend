import { rest } from 'msw'
import { userProfileData } from 'public/data/userProfileData'

const profileHandler = rest.get('/api/users/userId', (req, res, ctx) => {
  const { userId } = req.params
  const userData = userProfileData

  return res(ctx.status(200), ctx.json(userData))
})

export default profileHandler
