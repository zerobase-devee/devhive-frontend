import { HttpResponse, http } from 'msw'
import { userBadgeData } from 'public/mockData/mypage/userBadge'
import {
  userCarrersData,
  userProjectHistoriesData,
  userTechStacks,
} from 'public/mockData/mypage/userInfo'

export const userData = http.get('/api/users/my-profile', () => {
  const data = {
    userId: 0,
    isLocalLogin: true,
    email: 'qwe@qwer.com',
    nickName: '개발자',
    region: '서울',
    profileImage: null,
    intro: '안녕하세요.',
  }

  return HttpResponse.json(data, {
    status: 200,
  })
})

export const hiveLevel = http.get(
  '/api/members/users/:userId/hive-level',
  () => {
    return HttpResponse.json(3, {
      status: 200,
    })
  },
)

export const exitNum = http.get('/api/users/:userId/exit-num', () => {
  return HttpResponse.json(0, {
    status: 200,
  })
})

export const userBadges = http.get('/api/users/:userId/badges', () => {
  const data = userBadgeData

  return HttpResponse.json(data, {
    status: 200,
  })
})

export const userCarrers = http.get('/api/users/:userId/careers', () => {
  const data = userCarrersData
  return HttpResponse.json(data, { status: 200 })
})

export const userTechStack = http.get('/api/users/:userId/tech-stacks', () => {
  const data = userTechStacks
  return HttpResponse.json(data, { status: 200 })
})

export const userProjectHistories = http.get(
  '/api/members/users/:userId/project-histories',
  () => {
    const data = userProjectHistoriesData

    return HttpResponse.json(data, { status: 200 })
  },
)
