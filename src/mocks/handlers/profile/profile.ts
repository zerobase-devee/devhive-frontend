import { HttpResponse, http } from 'msw'

export const getProfile = http.get('/api/users/:userId', () => {
  const data = {
    userId: '3',
    nickName: '새로운개발자',
    favoriteId: null,
    profileImage: null,
    intro: '반갑습니다.',
  }
  return HttpResponse.json(data, { status: 200 })
})
